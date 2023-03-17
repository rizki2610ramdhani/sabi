package productdto

type CreateProductRequest struct {
	ProductName string `json:"product_name" form:"product_name" validate:"required"`
	Price       int    `json:"price" form:"price" validate:"required"`
	Stock       int    `json:"stock" form:"stock" validate:"required"`
	Desc        string `json:"desc" form:"desc" validate:"required"`
	Image       string `json:"image" form:"image" validate:"required"`
}

type UpdateProductRequest struct {
	ProductName string `json:"product_name" form:"product_name"`
	Price       int    `json:"price" form:"price"`
	Stock       int    `json:"stock" form:"stock"`
	Desc        string `json:"desc" form:"desc"`
	Image       string `json:"image" form:"image"`
	IsActive    bool   `json:"is_active" form:"is_active"`
}

type DeleteProductRequest struct {
	IsActive bool `json:"is_active" form:"is_active"`
}
