import {Link} from 'react-router-dom';
import '../../styles.css'
import BackButton from "../../components/backButton/BackButton";
import FooterNavigation from "../../components/footerNavigation/FooterNavigation";

function HistoricalTracking() {
    return (
        <div className='main-page'>
            <Link to="/userpage" id='backButton'> <BackButton/> </Link>
            <h1 className='main-page-header'>Historical Tracking</h1>

            <Link to='/statistics' id='defaultButton'>See my progress</Link>
            <Link to='/mypersonalrecords' id='defaultButton'>My personal records</Link>

            <FooterNavigation/>
        </div>
    );
}

export default HistoricalTracking;