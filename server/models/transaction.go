package models

type Transaction struct {
	Id            int                  `json:"id" gorm:"primaryKey"`
	UserId        int                  `json:"user_id"`
	User          UserToAll            `json:"user"`
	AddressId     int                  `json:"address_id"`
	Address       AddressToTransaction `json:"address"`
	CartId        int                  `json:"cart_id"`
	Cart          CartToTransaction    `json:"cart"`
	Qty           int                  `json:"qty" gorm:"type:int"`
	Total         int                  `json:"total" gorm:"type:int"`
	Status        string               `json:"status" gorm:"type:varchar(100)"`
	ImageApproved string               `json:"image_approved" gorm:"type:varchar(255)"`
}
