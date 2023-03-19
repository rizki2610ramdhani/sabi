package models

type Transaction struct {
	Id        int           `json:"id" gorm:"primaryKey"`
	UserId    int           `json:"user_id"`
	User      UserToAll     `json:"user"`
	ProductId int           `json:"cart_id"`
	Product   ProductToCart `json:"product"`
	Qty       int           `json:"qty" gorm:"type:int"`
	Total     int           `json:"total" gorm:"type:int"`
	Status    string        `json:"status" gorm:"type:varchar(100)"`
}
