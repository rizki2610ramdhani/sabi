package transactiondto

type CreateTransactionRequest struct {
	UserId    int    `json:"user_id" validate:"required"`
	ProductId int    `json:"product_id" validate:"required"`
	Qty       int    `json:"qty" validate:"required"`
	Total     int    `json:"total" validate:"required"`
	Status    string `json:"status" validate:"required"`
}
