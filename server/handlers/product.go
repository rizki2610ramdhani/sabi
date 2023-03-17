package handlers

import (
	productdto "backend/dto/product"
	dto "backend/dto/result"
	"backend/models"
	"backend/repositories"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

var path_file = "http://localhost:5000/uploads/"

type handlerProduct struct {
	ProductRepository repositories.ProductRepository
}

func HandlerProduct(ProductRepository repositories.ProductRepository) *handlerProduct {
	return &handlerProduct{ProductRepository}
}

func (h *handlerProduct) FindProducts(c echo.Context) error {
	products, err := h.ProductRepository.FindProducts()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	for i, p := range products {
		products[i].Image = path_file + p.Image
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: products})
}

func (h *handlerProduct) GetProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	var product models.Product
	product, err := h.ProductRepository.GetProduct(id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	product.Image = path_file + product.Image

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: product})
}

func (h *handlerProduct) CreateProduct(c echo.Context) error {

	userLogin := c.Get("userLogin")
	userRole := userLogin.(jwt.MapClaims)["role"].(string)

	if userRole != "admin" {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: "Access denied"})
	}

	var err error
	dataFile := c.Get("dataFile").(string)

	price, _ := strconv.Atoi(c.FormValue("price"))
	stock, _ := strconv.Atoi(c.FormValue("stock"))

	request := productdto.CreateProductRequest{
		ProductName: c.FormValue("product_name"),
		Price:       price,
		Stock:       stock,
		Desc:        c.FormValue("desc"),
		Image:       dataFile,
	}

	validation := validator.New()
	err = validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	product := models.Product{
		ProductName: request.ProductName,
		Price:       request.Price,
		Stock:       request.Stock,
		Desc:        request.Desc,
		Image:       request.Image,
	}

	product, err = h.ProductRepository.CreateProduct(product)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	product, _ = h.ProductRepository.GetProduct(product.Id)

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: product})
}

func (h *handlerProduct) UpdateProduct(c echo.Context) error {
	var err error
	dataFile := c.Get("dataFile").(string)

	price, _ := strconv.Atoi(c.FormValue("price"))
	stock, _ := strconv.Atoi(c.FormValue("stock"))

	request := productdto.UpdateProductRequest{
		ProductName: c.FormValue("product_name"),
		Price:       price,
		Stock:       stock,
		Desc:        c.FormValue("desc"),
		Image:       dataFile,
		IsActive:    true,
	}

	validation := validator.New()
	err = validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	id, _ := strconv.Atoi(c.Param("id"))

	product, err := h.ProductRepository.GetProduct(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	if request.ProductName != "" {
		product.ProductName = request.ProductName
	}

	if request.Price != 0 {
		product.Price = request.Price
	}

	if request.Stock != 0 {
		product.Stock = request.Stock
	}

	if request.Desc != "" {
		product.Desc = request.Desc
	}

	if request.Image != "" {
		product.Image = request.Image
	}

	data, err := h.ProductRepository.UpdateProduct(product)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}

func (h *handlerProduct) DeleteProduct(c echo.Context) error {

	userLogin := c.Get("userLogin")
	userRole := userLogin.(jwt.MapClaims)["role"].(string)

	if userRole != "admin" {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: "Access denied"})
	}

	request := productdto.DeleteProductRequest{
		IsActive: false,
	}

	id, _ := strconv.Atoi(c.Param("id"))

	product, err := h.ProductRepository.GetProduct(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	product.IsActive = request.IsActive

	data, err := h.ProductRepository.UpdateProduct(product)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}
