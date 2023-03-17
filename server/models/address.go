package models

type Address struct {
	Id        int       `json:"id" gorm:"primaryKey"`
	UserId    int       `json:"userIdi"`
	User      UserToAll `json:"user"`
	Address   string    `json:"name" gorm:"type:text"`
	PostCode  int       `json:"post_code"`
	Phone     string    `json:"phone" gorm:"type:varchar(20)"`
	Recipient string    `json:"recipient" gorm:"type:varchar(100)"`
}

type AddressToTransaction struct {
	Id        int    `json:"id"`
	Address   string `json:"address"`
	PostCode  int    `json:"post"`
	Phone     string `json:"phone"`
	Recipient string `json:"recipient"`
}

func (AddressToTransaction) TableName() string {
	return "addresses"
}
