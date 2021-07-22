import { Toolbar } from '../components/toolbar';
import Image from 'next/image';
import styles from '../styles/EOM.module.css';
import profileImage from '../assets/images/profile.jpg';

export const EOM = ({ employee }) => {

    return (
        <div className='page-container'>
            <Toolbar />
            <div className={styles.main}>
                <h1>Employee Of The Month</h1>

                <div className={styles.employeeOfTheMonth}>
                    <h3>{employee.name}</h3>
                    <h6>{employee.position}</h6>
                    <Image src={profileImage} alt="profileImage" />
                    <p>{employee.description}</p>
                </div>
            </div>
        </div>
    )
};


export const getServerSideProps = async (context) => {

    const apiResponse = await fetch('http://my-json-server.typicode.com/alaabashiyi/nextjs-news-app/employeeOfTheMonth');
    const employee = await apiResponse.json();

    return {
        props: {
            employee
        }
    }
};


export default EOM
