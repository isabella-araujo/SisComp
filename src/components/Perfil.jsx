import Avatar from "./Avatar";
import Title from "./Title";
import img from './assets/avatar.jpg'
import './css/perfil.css'

export default function Perfil({ usuario, width }) {
    const styles = {
        container: {
            width: width ?  `${width}` : 'auto',

        }
    }
    return (
        <div className="perfil-container">
            <Avatar img={img} />
            <Title size="1em">{usuario.id ? "Colaborador" : "Administrador"}</Title>
            <div className="container-status">
                <Title size='1rem'>ID:</Title>
                <p>{usuario.id ? usuario.id : "id"}</p>
            </div>
            <div className="container-status">
                <Title size='1rem'>Email:</Title>
                <p>{usuario.id ? usuario.email : "admin1@admin.acme.com.br"}</p>
            </div>
        </div>
    );
}
