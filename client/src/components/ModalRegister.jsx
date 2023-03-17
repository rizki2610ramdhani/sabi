import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { API } from '../config/api';
import Swal from 'sweetalert2'
import { Modal, Form, Button } from 'react-bootstrap';

function ModalRegister() {

    const [form, setForm] = useState({
        email: '',
        password: '',
        name: '',
    });
    const { email, password, name } = form;
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const response = await API.post('/register', form);

            console.log("register success : ", response)

            Swal.fire({
                title: 'Success!',
                text: 'Registrasi berhasil',
                icon: 'success',
                confirmButtonText: 'Kembali'
            })

            setForm({
                email: '',
                password: '',
                name: '',
            });

            handleClose()
            
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Registrasi gagal',
                icon: 'error',
                confirmButtonText: 'Kembali'
            })
            console.log("register failed : ", error);
        }
    });

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <Link onClick={handleShow} className='nav-link'>
                <span className='nav-text-register'>Register</span>
            </Link>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body className='p-4'>
                    <h4 className='nav-modal-text-header my-3'>Register</h4>
                    <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control name="email" value={email} onChange={handleChange} className='all-input-form' type="email" placeholder="Email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control name="password" value={password} onChange={handleChange} className='all-input-form' type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicFullName">
                            <Form.Control name="name" value={name} onChange={handleChange} className='all-input-form' type="text" placeholder="Full Name" />
                        </Form.Group>
                        <Button variant="primary" type="submit" className='all-btn-submit'>
                            Register
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal></>
    )
}

export default ModalRegister;