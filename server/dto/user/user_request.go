package userdto

type UpdateUser struct {
	Name  string `json:"name" form:"name"`
	Email string `json:"email" form:"email"`
	Photo string `json:"photo" form:"photo"`
}
