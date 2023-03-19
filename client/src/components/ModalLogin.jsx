import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { useMutation } from 'react-query';
import { API, setAuthToken } from '../config/api';
import Swal from 'sweetalert2'
import { UserContext } from '../context/userContext';
import { Modal, Form, Button } from 'react-bootstrap';

function ModalLogin() {

    let navigate = useNavigate();
    
    const [_, dispatch] = useContext(UserContext);

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const { email, password } = form;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const response = await API.post('/login', form);

            console.log("login success : ", response);

            // Send data to useContext
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: response.data.data,
            });

            setAuthToken(localStorage.token);
            window.location.reload();
            // Status check
            navigate("/")

            Swal.fire({
                title: 'Success!',
                text: 'Login berhasil',
                icon: 'success',
                confirmButtonText: 'Kembali'
            })
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Login gagal',
                icon: 'error',
                confirmButtonText: 'Kembali'
            })
            console.log("login failed : ", error);
        }
    });

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Link onClick={handleShow} className='nav-link'>
                <span className='nav-text-login'>Login</span>
            </Link>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body className='p-4'>
                    <h4 className='nav-modal-text-header  my-3'>Login</h4>
                    <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control name="email" value={email} onChange={handleChange} className='all-input-form' type="email" placeholder="Email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control name="password" value={password} onChange={handleChange} className='all-input-form' type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit" className='all-btn-submit'>
                            Login
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalLogin;