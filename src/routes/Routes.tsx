import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navigate } from 'react-router-dom';
import AppLayout from "layouts/AppLayout"
import ProductList from "pages/product-list/ProductList"
import ProductAdd from "pages/product-add/ProductAdd"
import CategoryAdd from "pages/category-add/CategoryAdd";
import CategoryList from "pages/category-list/CategoryList";
import ProductListMain from "pages/product-list-main/ProductListMain";

export default function () {
       return (
              <BrowserRouter>
                     <Routes>
                            <Route path="/" element={<AppLayout />}>
                                   <Route path="/" element={<Navigate to="/products" />} />
                                   <Route path="/products" element={<ProductListMain />} />
                                   <Route path="/admin/products" element={<ProductList />} />
                                   <Route path="/admin/products/add" element={<ProductAdd />} />
                                   <Route path="/admin/categories" element={<CategoryList />} />
                                   <Route path="/admin/categories/add" element={<CategoryAdd />} />
                                   <Route path="*" element={<Navigate to="/products" />} />
                            </Route>
                     </Routes>
              </BrowserRouter>
       );
}