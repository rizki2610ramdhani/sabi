package models

type User struct {
	Id       int    `json:"id" gorm:"primaryKey"`
	Name     string `json:"name" gorm:"type:varchar(100)"`
	Email    string `json:"email" gorm:"type:varchar(100); unique"`
	Photo    string `json:"photo" gorm:"type:varchar(255)"`
	Password string `json:"password" gorm:"type:varchar(255)"`
	Role     string `json:"role" gorm:"type:varchar(20)"`
}

type UserToAll struct {
	Id    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

func (UserToAll) TableName() string {
	return "users"
}
