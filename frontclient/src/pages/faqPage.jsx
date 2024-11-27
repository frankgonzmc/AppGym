import React from 'react'
import { Card } from 'react-bootstrap'
import './css.faqPage.css'  // Tu propio archivo CSS para personalizar el faqPage

function FaqPage() {
    return (
        <section className='seccion'>
            <Card>
                <h1>FAQ</h1>    // Tu propio contenido para la página de FAQ

                <h2>¿Qué es App Gym?</h2>
                <p>App Gym es una aplicación web que te ayuda a mejorar tus habilidades y llevar una vida más saludable. Explora nuestras recomendaciones de ejercicios y disfruta de una experiencia única.</p>

                <h2>¿Qué es la IA?</h2>
                <p>La IA es una tecnología que utiliza algoritmos y modelos matemáticos para analizar y aprender de grandes cantidades de datos. En el contexto de App Gym, la IA se utiliza para generar recomendaciones personalizadas de ejercicios y rutinas para mejorar tus habilidades.</p>

                <h2>¿Cómo funciona la IA?</h2>
                <p>La IA utiliza algoritmos y modelos matemáticos para analizar y aprender de grandes cantidades de datos. En el contexto de App Gym, la IA se utiliza para generar recomendaciones personalizadas de ejercicios y rutinas para mejorar tus habilidades.</p>

                <h2>¿Cómo puedo contribuir a App Gym?</h2>
                <p>Si tienes alguna idea o sugerencia para mejorar la IA o la experiencia de usuario, puedes enviarnos tus comentarios o sugerencias a través de nuestro formulario de contacto. También puedes unirte a nuestra comunidad en nuestro canal de Discord para obtener más información y colaborar con otros usuarios.</p>

                <h2>¿Cómo puedo obtener más información sobre la IA?</h2>
                <p>Para obtener más información sobre la IA y cómo funciona, puedes visitar nuestra página de documentación en línea o leer nuestro manual de usuario. También puedes unirte a nuestra comunidad en nuestro canal de Discord para obtener más información y colaborar con otros usuarios.</p>

                <h2>¿Cómo puedo obtener más información sobre App Gym?</h2>
                <p>Para obtener más información sobre App Gym y cómo funciona, puedes visitar nuestra página de documentación en línea o leer nuestro manual de usuario. También puedes unirte a nuestra comunidad en nuestro canal de Discord para obtener más información y colaborar con otros usuarios.</p>

            </Card>
        </section>
    )
}

export default FaqPage