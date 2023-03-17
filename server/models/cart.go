package models

type Cart struct {
	Id        int           `json:"id" gorm:"primaryKey"`
	UserId    int           `json:"user_id"`
	User      UserToAll     `json:"user"`
	ProductId int           `json:"product_id"`
	Product   ProductToCart `json:"product"`
}

type CartToTransaction struct {
	Id        int           `json:"id"`
	ProductId int           `json:"product_id"`
	Product   ProductToCart `json:"product"`
}

func (CartToTransaction) TableName() string {
	return "carts"
}
