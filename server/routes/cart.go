package routes

import (
	"backend/handlers"
	"backend/pkg/middleware"
	"backend/pkg/mysql"
	"backend/repositories"

	"github.com/labstack/echo/v4"
)

func CartRoutes(e *echo.Group) {
	CartRepository := repositories.RepositoryCart(mysql.DB)
	h := handlers.HandlerCart(CartRepository)

	e.GET("/carts", middleware.Auth(h.FindCart))
	e.POST("/cart/:id", middleware.Auth(h.CreateCart))
	e.GET("/cart/:id", middleware.Auth(h.GetCart))
	e.DELETE("/cart/:id", middleware.Auth(h.DeleteCart))
}
