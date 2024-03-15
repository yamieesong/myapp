import React, { useState, useEffect } from 'react'
import Session from 'react-session-api'

const TestPage = () => {
  const [menu, setMenu] = useState([])
  const [node, setNode] = useState([])

  useEffect(() => {
    console.log('useEffect start')
    console.log(Session.get('menuList'))
    setMenu(Session.get('menuList'))
    let menuList = Session.get('menuList')
    console.log(menuList)
    // let nodeList = [];
    // menuList.forEach((list) => {
    //     nodeList.push(list.nodeList);
    // });
    // setNode(nodeList);
  }, [])

  let i = -1
  const nodeList = () => {
    console.log('nodeList start')
    i++
    let nodeList = []
    let length = menu[i].nodeList.length
    for (let j = 0; j < length; j++) {
      nodeList.push(<li> - {menu[i].nodeList[j].mnu_nm}</li>)
    }
    return nodeList
  }

  return (
    <>
      <h1>테스트페이지</h1>
      {menu.map((list, index) => {
        return (
          <li key={index}>
            <dl>
              <dt>
                <a href='#'>{list.mnu_nm}</a>
              </dt>
              <dd>
                <a href='#'>{nodeList()}</a>
              </dd>
            </dl>
          </li>
        )
      })}
    </>
  )
}

export default TestPage
