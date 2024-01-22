import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Routes
} from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import {
	Home,
	Products,
	SingleProduct,
	Cart,
	Checkout,
	Error,
	Private,
	About,
	AuthWrapper
} from './pages';
function App() {
	return (
		<AuthWrapper>
			<Router>
				<Navbar />
				<Sidebar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="about" element={<About />} />
					<Route path="cart" element={<Cart />} />
					<Route path="products" element={<Products />} />
					<Route path="products/:id" element={<SingleProduct />} />
					<Route path="checkout" element={<Private component={Checkout} />}></Route>
					<Route path="*" element={<Error />} />
				</Routes>
				<Footer />
			</Router>
		</AuthWrapper>
	);
}

export default App;
