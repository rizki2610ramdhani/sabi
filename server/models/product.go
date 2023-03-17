package models

type Product struct {
	Id          int    `json:"id" gorm:"primaryKey"`
	ProductName string `json:"product_name" gorm:"type: varchar(255)"`
	Price       int    `json:"price" gorm:"type: int"`
	Stock       int    `json:"stock" gorm:"type:int"`
	Desc        string `json:"desc" gorm:"type:text"`
	Image       string `json:"image" gorm:"type:varchar(255)"`
	IsActive    bool   `json:"is_active" gorm:"type:boolean; default:true"`
}

type ProductToCart struct {
	Id          int    `json:"id"`
	ProductName string `json:"product_name"`
	Price       int    `json:"price"`
	Image       string `json:"image"`
}

func (ProductToCart) TableName() string {
	return "products"
}
