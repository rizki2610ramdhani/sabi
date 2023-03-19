package handlers

import (
	cartdto "backend/dto/cart"
	dto "backend/dto/result"
	"backend/models"
	"backend/repositories"
	"net/http"
	"strconv"

	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerCart struct {
	CartRepository repositories.CartRepository
}

func HandlerCart(CartRepository repositories.CartRepository) *handlerCart {
	return &handlerCart{CartRepository}
}

func (h *handlerCart) FindCart(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := int(userLogin.(jwt.MapClaims)["id"].(float64))

	carts, err := h.CartRepository.FindCart(userId)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	for i, p := range carts {
		carts[i].Product.Image = path_file + p.Product.Image
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: carts})
}

func (h *handlerCart) GetCart(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	var cart models.Cart
	cart, err := h.CartRepository.GetCart(id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: cart})
}

func (h *handlerCart) CreateCart(c echo.Context) error {

	userLogin := c.Get("userLogin")
	iduser := int(userLogin.(jwt.MapClaims)["id"].(float64))

	idProduct, _ := strconv.Atoi(c.Param("id"))

	var err error

	request := cartdto.CartRequest{
		UserId:    iduser,
		ProductId: idProduct,
	}

	cart := models.Cart{
		UserId:    request.UserId,
		ProductId: request.ProductId,
	}

	cart, err = h.CartRepository.CreateCart(cart)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	cart, _ = h.CartRepository.GetCart(cart.Id)

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: cart})
}

// func (h *handlerProduct) UpdateProduct(c echo.Context) error {
// 	var err error
// 	dataFile := c.Get("dataFile").(string)

// 	price, _ := strconv.Atoi(c.FormValue("price"))
// 	stock, _ := strconv.Atoi(c.FormValue("stock"))

// 	request := productdto.UpdateProductRequest{
// 		ProductName: c.FormValue("product_name"),
// 		Price:       price,
// 		Stock:       stock,
// 		Desc:        c.FormValue("desc"),
// 		Image:       dataFile,
// 		IsActive:    true,
// 	}

// 	validation := validator.New()
// 	err = validation.Struct(request)
// 	if err != nil {
// 		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
// 	}

// 	id, _ := strconv.Atoi(c.Param("id"))

// 	product, err := h.ProductRepository.GetProduct(id)

// 	if err != nil {
// 		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
// 	}

// 	if request.ProductName != "" {
// 		product.ProductName = request.ProductName
// 	}

// 	if request.Price != 0 {
// 		product.Price = request.Price
// 	}

// 	if request.Stock != 0 {
// 		product.Stock = request.Stock
// 	}

// 	if request.Desc != "" {
// 		product.Desc = request.Desc
// 	}

// 	if request.Image != "" {
// 		product.Image = request.Image
// 	}

// 	data, err := h.ProductRepository.UpdateProduct(product)
// 	if err != nil {
// 		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
// 	}

// 	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
// }

func (h *handlerCart) DeleteCart(c echo.Context) error {

	id, _ := strconv.Atoi(c.Param("id"))

	cart, err := h.CartRepository.GetCart(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.CartRepository.DeleteCart(cart, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}
