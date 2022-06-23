import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from 'components/Header';
import Home from 'pages/Home';
import MyPage from 'pages/MyPage';
import Post from 'pages/Post';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import NotFound from 'pages/NotFound';

const App = () => {
  return (
    <div>

			{/* <BrowserRouter>
				<Routes>
					
					
					<Route element={<Header/>}>
					
						<Route path="/" element={<Home />}></Route>
						<Route path="/mypage/*" element={<MyPage />}></Route>
						<Route path="/post/*" element={<Post />}></Route>
						<Route path="*" element={<NotFound />}></Route>
					
					</Route>

					<Route path="/signin/*" element={<SignIn />}></Route>
					<Route path="/signup/*" element={<SignUp />}></Route>
					
				</Routes>
			</BrowserRouter> */}
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/mypage/*" element={<MyPage />}></Route>
					<Route path="/post/*" element={<Post />}></Route>
					<Route path="/signin/*" element={<SignIn />}></Route>
					<Route path="/signup/*" element={<SignUp />}></Route>
					<Route path="*" element={<NotFound />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
  );
}

export default App;
