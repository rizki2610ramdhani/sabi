package handlers

import (
	dto "backend/dto/result"
	userdto "backend/dto/user"
	"backend/models"
	"backend/repositories"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type handlerUser struct {
	UserRepository repositories.UserRepository
}

func HandlerUser(UserRepository repositories.UserRepository) *handlerUser {
	return &handlerUser{UserRepository}
}

func (h *handlerUser) GetUser(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	var user models.User
	user, err := h.UserRepository.GetUser(id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: user})
}

func (h *handlerUser) UpdateUser(c echo.Context) error {
	var err error
	dataFile := c.Get("dataFile").(string)

	request := userdto.UpdateUser{
		Name:  c.FormValue("name"),
		Email: c.FormValue("email"),
		Photo: dataFile,
	}

	validation := validator.New()
	err = validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	id, _ := strconv.Atoi(c.Param("id"))

	user, err := h.UserRepository.GetUser(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	if request.Name != "" {
		user.Name = request.Name
	}

	if request.Email != "" {
		user.Email = request.Email
	}

	if request.Photo != "" {
		user.Photo = request.Photo
	}

	data, err := h.UserRepository.UpdateUser(user)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}
