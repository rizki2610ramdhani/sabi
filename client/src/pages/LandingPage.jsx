import { Container, Row, Col, Card } from 'react-bootstrap'
import '../style.css'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query';
import { API } from '../config/api'
import toRupiah from '../components/utils/ToRupiah';

export default function LandingPage() {

    let { data: products } = useQuery('productsCache', async () => {
        const response = await API.get('/products');
        return response.data.data;
    });

    return (
        <Container>
            <Row>
                {products?.length != 0 &&
                    products?.map((item, index) => (
                        <Col md={3} sm={6} xs={12} key={index}>
                            <Link to={"/product-detail/" + item.id} className='all-text-decoration-none'>
                                <Card className='lp-card-style m-1'>
                                    <Card.Img className='lp-card-img' variant="top" src={item.image}/>
                                    <Card.Body className='lp-card-body-style'>
                                        <Card.Title className='all-text-color-brown'><strong>{item.product_name}</strong></Card.Title>
                                        <Card.Text className='pt-2'>
                                            <span className='all-text-color-light-brown'>{toRupiah(item.price)}</span>
                                            <br />
                                            <span className='all-text-color-light-brown'>Stock : {item.stock}</span>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    )
}