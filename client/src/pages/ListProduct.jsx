import { Container, Row, Col } from "react-bootstrap";
import { useQuery } from 'react-query';
import { API } from '../config/api'
import { Link } from "react-router-dom";
import toRupiah from "../components/utils/ToRupiah";
import Swal from 'sweetalert2'
import ModalDetail from "../components/ModalDetail";

export default function ListProduct() {

    let { data: products, refetch } = useQuery('productsCache', async () => {
        const response = await API.get('/products');
        return response.data.data;
    });

    async function deleteProduct(id) {
        try {
            const response = await API.patch('/delete-product/' + id, { is_active: false }, { headers: { 'Content-type': 'application/json' } });
            Swal.fire({
                title: 'Success!',
                text: 'Product berhasil dihapus',
                icon: 'success',
                confirmButtonText: 'Kembali'
            })
            refetch()
        } catch (error) {
            Swal.fire({
                title: 'Success!',
                text: 'Product gagal dihapus',
                icon: 'success',
                confirmButtonText: 'Kembali'
            })
        }
    }

    return (
        <Container>
            <Row>
                <Col className="py-2 px-5">
                    <h3 className="all-title-text">List Product</h3>
                    <table className="table" border="1">
                        <thead className="table-secondary">
                            <tr className="text-center">
                                <th scope="col">No</th>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Price</th>
                                <th scope="col">Description</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.length != 0 &&
                                products?.map((item, index) => (
                                    <tr key={index}>
                                        <th className="text-center" scope="row">{index + 1}</th>
                                        <td className="text-center">
                                            <ModalDetail titleButton="Clik here!" modalHeader="Image" modalBody={<img src={item.image} className={"img-fluid"} />} />
                                        </td>
                                        <td>{item.product_name}</td>
                                        <td className="text-center">{item.stock}</td>
                                        <td className="text-center">{toRupiah(item.price)}</td>
                                        <td className="text-center">
                                            <ModalDetail titleButton="Clik here!" modalHeader="Description" modalBody={item.desc} />
                                        </td>
                                        <td className="text-center">
                                            <button className="lp-btn">
                                                <Link onClick={() => deleteProduct(item.id)} className="lp-delete-link">Delete</Link>
                                            </button>
                                            <button className="lp-btn">
                                                <Link to={"/product-edit/" + item.id} className="lp-edit-link">Update</Link>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </Col>
            </Row>
        </Container>
    );
}