import React, { Component } from "react";
import api from "../../services/api";
import './styles.css'
import { Link } from 'react-router-dom'
export default class Main extends Component {
  state = {
    products: [],
    productInfo:{},
    page: 1,
  };
  componentDidMount() {
    this.loadProducts();
  }
  loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);
    const { docs, ...productInfo} = response.data
    this.setState({ products: docs, productInfo, page });
  };
  prevPage=()=>{
    const { page} = this.state;
    if(page === 1) return //se estivermos na primeira página não retorna nada

    const pageNumber = page - 1 //senão passar para próxima página
    this.loadProducts(pageNumber)
  }
  nextPage=()=>{
    const { page, productInfo} = this.state;
    if(page === productInfo.pages) return //se estivermos na última página não retorna nada

    const pageNumber = page + 1 //senão voltar para página anterior
    this.loadProducts(pageNumber)
  }
  render() {
    const {products, page, productInfo} = this.state;
    return (
      <div className="product-list">
        {products.map((products) => (
          <article key={products._id}>
            <strong>{products.title}</strong>
            <p>{products.description}</p>
            <Link to={`/products/${products._id}`}>Acessar</Link>
          </article>
        ))}
        <div className="actions">
          <button disabled={page === 1} onClick={this.prevPage}>Voltar</button>
          <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próximo</button>
        </div>
      </div>
    );
  }
}
