
export const EOM = ({ employee }) => {
    return (
        <div className='page-container'>
            <div>
                <h1>Employee Of The Month</h1>
            </div>
        </div>
    )
};


export const getServerSideProps = async (context) => {
    const apiResponse = await fetch('https://jsonplaceholder.typicode.com/users/1')
};


export default EOM
