import './index.css'

const Footer = () => {
    return (
        <div className='footer'>
            <div className='apps'>
                <img src='\imagens\fb.png' alt='facebook' />
                <img src='\imagens\tw.png' alt='twitter' />
                <img src='\imagens\ig.png' alt='instagram' />
            </div>
            <div className='logo'>
                <img src='\imagens\logo.png' alt='logo' />
            </div>
            <p>Desenvolvido por Alura.</p>
        </div>
    )
}

export default Footer;