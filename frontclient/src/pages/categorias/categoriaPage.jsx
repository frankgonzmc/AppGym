import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';
import { PanelCategorias } from '../../components/panelCategorias'

function categoriaPage() {
    return (
        <div>
            <Col md={3}>
                <PanelCategorias />
            </Col>
        </div>
    )
}

export default categoriaPage