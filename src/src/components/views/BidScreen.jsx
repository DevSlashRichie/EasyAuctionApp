import './bidScreen.scss'
import {UserBox} from "../UserBox";

export function BidScreen() {

    return (
        <div className="bid-screen">
            <UserBox />

            <div className="nft-image">
                <img src="https://i0.mymetaverse.io/3,01637037d6" />
            </div>

            <div className="side">

                <div className="bid-info">
                    <span>Colocar Puja</span>
                    <div className="bid-data">
                        <span className="text">Debe ser al menos</span>
                        <span className="amount">$1000</span>
                    </div>
                </div>

                <div className="controllers">
                    <input type="number" placeholder="0" aria-controls="hidden"/>
                    <div className="btn">
                        Pujar
                    </div>
                </div>

                <div className="last-data">

                    <div className="last">
                        <div className="black">Puja Acutal</div>
                        <div className="amount">$1000</div>
                    </div>

                    <div className="time">

                        <div className="title-timer">Subata termina en:</div>

                        <div className="timer">
                            <div>
                                <span className="value">2</span>
                                <span>Hours</span>
                            </div>

                            <div>
                                <span className="value">2</span>
                                <span>Minutos</span>
                            </div>

                            <div>
                                <span className="value">2</span>
                                <span>Segundos</span>
                            </div>
                        </div>



                    </div>



                </div>
            </div>


        </div>
    )

}
