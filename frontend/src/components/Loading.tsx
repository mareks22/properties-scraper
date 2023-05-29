import '../spinner.css'
import './Loading.scss'

export default function Loading(){
    return (
        <div className="loading-screen">
            <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            </div>
            <p> Scraping properties </p>
            <small> This might take some minutes.</small>
      </div>
    )
}