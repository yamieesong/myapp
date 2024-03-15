import logo from './logo.svg'
import './App.css'

import React, { Component, startTransition } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './frame/Header'
import Main from './frame/Main'
import Product from './frame/Product'
import NotFound from './frame/NotFound'
import Left from './frame/Left'
import Login from './pages/Login'

const App2 = () => {
  /*
          return (
            <div className='App'>
              <BrowserRouter>
                <table>
                  <tr>
                    <td> {<Left />} </td>{' '}
                    <td>
                      <Header />
                      <Routes>
                        <Route path='/' element={<Main />}>
                          {' '}
                        </Route>{' '}
                        <Route path='/product/:productId' element={<Product />}>
                          {' '}
                        </Route>{' '}
                        <Route path='*' element={<NotFound />}>
                          {' '}
                        </Route>{' '}
                      </Routes>{' '}
                    </td>{' '}
                  </tr>{' '}
                </table>{' '}
              </BrowserRouter>{' '}
            </div>
          )
          */
}

export default App2
