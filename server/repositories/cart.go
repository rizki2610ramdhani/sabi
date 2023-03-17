package repositories

import (
	"backend/models"

	"gorm.io/gorm"
)

type CartRepository interface {
	FindCart(id int) ([]models.Cart, error)
	GetCart(id int) (models.Cart, error)
	CreateCart(cart models.Cart) (models.Cart, error)
	DeleteCart(cart models.Cart, id int) (models.Cart, error)
}

func RepositoryCart(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindCart(id int) ([]models.Cart, error) {
	var carts []models.Cart
	err := r.db.Where("user_id = ? ", id).Preload("User").Preload("Product").Find(&carts).Error

	return carts, err
}

func (r *repository) GetCart(ID int) (models.Cart, error) {
	var cart models.Cart
	err := r.db.Preload("User").Preload("Product").First(&cart, ID).Error

	return cart, err
}

func (r *repository) CreateCart(cart models.Cart) (models.Cart, error) {
	err := r.db.Create(&cart).Error

	return cart, err
}

func (r *repository) DeleteCart(cart models.Cart, ID int) (models.Cart, error) {
	err := r.db.Delete(&cart, ID).Scan(&cart).Error

	return cart, err
}
