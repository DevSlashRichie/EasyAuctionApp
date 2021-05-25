import './bidScreen.scss'
import {UserBox} from "../UserBox";
import {END_TIME, supabase} from "../../logic/logic";
import {useEffect, useState} from "react";
import {shake} from "react-animations";
import Radium, {StyleRoot} from "radium";

const BID_AMOUNT = 100;
const END_TIME_UNIX = END_TIME;

export function BidScreen() {
    const [lastBid, setLastBid] = useState(0);
    const [minBid, setMinBid] = useState(BID_AMOUNT);
    const [endTime, setEndTime] = useState([]);
    const [bidText, setBidText] = useState("");
    const [error, setError] = useState('');

    useEffect(() => {

        const updateBid = (amount) => {
            setLastBid(amount);
            setMinBid(amount + BID_AMOUNT);
        }

        const fetchData = async () => {
            let { data: Bids } = await supabase
                .from('Bids')
                .select('amount')
                .limit(1)
                .order("id", {
                    ascending: false
                });

            if (Bids && Bids.length > 0) {
                const lastRecord = Bids[0];
                const foundLastBid = lastRecord.amount;
                updateBid(foundLastBid);
            }
        }

        setInterval(() => {
            const times = converUnixToArray();
            setEndTime(times);
        }, 1000);

        fetchData();

        // Listener

        supabase
            .from('Bids')
            .on('INSERT', payload => {
                updateBid(payload.new.amount);
            })
            .subscribe()


    }, []);

    const converUnixToArray = () => {
        const currentTime = new Date().getTime() / 1000;
        const date = new Date((END_TIME_UNIX - currentTime) * 1000);

        return [
            date.getSeconds(),
            date.getMinutes(),
            date.getHours()
        ]
    }

    const createBid = async () => {
        const amount = bidText;
        if (!amount || amount < minBid || !amount.match(/[0-9]+/)) {
            setError("La puja debe ser de al menos: " + minBid);
            return;
        }

        const user = supabase.auth.user();
        const { error } = await supabase.from('Bids')
            .insert([
                {
                    bidder: user.id,
                    amount: amount,
                    email: user.email
                }
            ]);

        if (error) {
            console.log(error);
        }

        setBidText("");
    }

    const handleBidChange = (event) => {
        const amount = event.target.value;

        if(isNaN(amount))
            return;

        if (amount) {
            setBidText(amount);
            setError("");
        }

    }

    const deleteLastKeyHandler = (event) => {
        if(event.keyCode === 13)
            createBid();

        if(isNaN(event.key) && event.keyCode !== 8)
            event.preventDefault();

        if(event.keyCode === 8) {
            if(bidText.length === 1)
                setBidText("");
        }
    }

    const styles = {
        shake: {
            animation: "x 0.4s",
            animationName: Radium.keyframes(shake, 'shake')
        }
    }

    return (
        <div className="bid-screen">
            <UserBox/>

            <div className="nft-image">
                <img src="https://i0.mymetaverse.io/3,01637037d6" alt="NFT"/>
            </div>

            <div className="side">

                <div className="bid-info">
                    <span>Colocar Puja</span>
                    <div className="bid-data">
                        <span className="text">Debe ser al menos</span>
                        <span className="amount">${minBid} MXN</span>
                    </div>
                </div>

                <div className="controllers">
                    {
                        error ?
                            <StyleRoot>
                                <div className={"error"} style={[styles.shake]}>
                                    {error}
                                </div>
                            </StyleRoot>
                         : []
                    }
                    <input type="number" placeholder="0" aria-controls="hidden"
                           value={bidText}
                           onChange={handleBidChange}
                           onKeyDown={deleteLastKeyHandler}
                    />
                    <div className={"btn"} onClick={createBid}>
                        Pujar
                    </div>
                </div>

                <div className="last-data">

                    <div className="last">
                        <div className="black">Última Puja</div>
                        <div className="amount">${lastBid}</div>
                    </div>

                    <div className="time">

                        <div className="title-timer">Subasta termina en:</div>

                        <div className="timer">
                            <div>
                                <span className="value">{endTime[2]}</span>
                                <span>Horas</span>
                            </div>

                            <div>
                                <span className="value">{endTime[1]}</span>
                                <span>Minutos</span>
                            </div>

                            <div>
                                <span className="value">{endTime[0]}</span>
                                <span>Segundos</span>
                            </div>
                        </div>


                    </div>


                </div>
            </div>


        </div>
    );

}
