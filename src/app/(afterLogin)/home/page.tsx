import Post from '../_component/Post';
import PostForm from './_components/PostForm';
import Tab from './_components/Tab';
import TabProvider from './_components/TabProvider';
import TestInfiniteScroll from './_components/testInfiniteScroll';
import style from './home.module.css';
export default function Home() {
    return (
        <main className={style.main}>
            <TabProvider>
                <Tab />
            </TabProvider>
            <PostForm />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            홈페이지
            {/* <TestInfiniteScroll /> */}
        </main>
    );
}
