import { useRouter } from 'next/router';
import Image from 'next/image';
import { Toolbar } from '../../components/toolbar';
import styles from '../../styles/Feed.module.css';


export const Feed = ({ pageNumber, articles }) => {
    console.log(articles);
    const router = useRouter();

    return (
        <div className="page-container">
            <Toolbar />
            <div className={styles.main}>
                {articles.map(article => (
                    <div key={article.publishedAt} className={styles.post}>
                        <h1>{article.title}</h1>
                        <p>{article.description}</p>
                        {!!article.urlToImage && <Image src={article.urlToImage} width={500} height={250} alt="articleImg" />}
                    </div>
                ))}
            </div>

            <div className={styles.paginator}>
                <div onClick={() => {
                    if (pageNumber > 1) {
                        router.push(`/feed/${pageNumber - 1}`)
                    }
                }} className={pageNumber === 1 ? styles.disabled : styles.active}>
                    Previous page
                </div>

                <div>
                    #{pageNumber}
                </div>

                <div onClick={() => {
                    if (pageNumber < 5) {
                        router.push(`/feed/${pageNumber + 1}`)
                    }
                }} className={pageNumber === 5 ? styles.disabled : styles.active}>
                    Next page
                </div>

            </div>

        </div>
    )
};


export const getServerSideProps = async context => {
    const pageNumber = context.query.pid;

    if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
        return {
            props: {
                articles: [],
                pageNumber: 0,
            }
        }
    }

    const apiResponse = await fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNumber}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`
            }
        }
    );

    const apiJson = await apiResponse.json();

    const { articles } = apiJson;

    return {
        props: {
            articles,
            pageNumber: +pageNumber
        }
    }

}


export default Feed;