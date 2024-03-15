import React, {useState, useEffect} from 'react'
import SamplePage1 from '../pages/SamplePage1'
import FourHundredFour from '../pages/FourHundredFour'
import SamplePage2 from '../sampletest/samplepage2'
import Testpage1 from '../test/testpage1'
import Testpage2 from '../test/testpage2'
import SamplePage3 from '../sampletest/samplepage3'
import SamplePage4 from '../sampletest/samplepage4'
// import Samplepage5 from '../sampletest/samplepage5'
// import SamplePage6 from '../sampletest/samplepage6'
// import SamplePage7 from '../sampletest/samplepage7'
// import SamplePage8 from '../sampletest/samplepage8'
// import SamplePage9 from '../sampletest/samplepage9'
import SamplePage10 from '../sampletest/samplepage10'
import UserInfo from '../scm/UserInfo'
import ExpendStatistics from '../mypage/ExpendStatistics'

const Content = (props) => {
  console.log('Content start')
  const [url, setUrl] = useState()


  console.log("props", props)
  let propsUrl = props.url
  console.log("propsUrl", propsUrl)

  let samplePageArr = [
    <SamplePage1/>,
    <SamplePage2/>,
    <SamplePage3/>,
    <SamplePage4 />,
    // <Samplepage5 />,
    // <SamplePage6 />,
    // <SamplePage7 />,
    // <SamplePage8 />,
    // <SamplePage9 />,
    <SamplePage10/>,
  ]

  //가게부 메뉴
  let scmDirPageArr = [
    <UserInfo/>,
  ]
  //마이페이지 메뉴
  let mypageDirPageArr = [
      <ExpendStatistics/>
  ]
  //관리자 메뉴
  let systemDirPageArr = [
  ]

  let testMenuArr = [<Testpage1/>, <Testpage2/>]

  let systemMenuArr = [
    //  <notice />, <comnCodMgr />, <FileSample />, <VueStudy />
  ]

  const content = () => {
    console.log('content start')
    // console.log(samplePageArr[3].type.name.toLowerCase())
    // const samplePageName = samplePageArr[3].type.name.toLowerCase();
    // alert(propsUrl+','+samplePageName)
    let returnValue = ''
    let flag = false
    // alert(propsUrl)
    // console.log("propsUrl", propsUrl)

    if (propsUrl) {
      let splitPropsUrl = propsUrl.split("/");
      let pageArr = [];
      //console.log("splitPropsUrl", splitPropsUrl)
      //가계부 메뉴
      if(splitPropsUrl[1] === "scm"){
        pageArr = scmDirPageArr;
      //마이페이지 메뉴
      }else if(splitPropsUrl[1] === "mypage"){
        pageArr = mypageDirPageArr;
      //관리자 메뉴
      }else if(splitPropsUrl[1] === "dlm" || splitPropsUrl[1] === "system"){
        pageArr = systemDirPageArr;
      }

      alert(splitPropsUrl[1])
      console.log("pageArr", pageArr)
      pageArr.forEach(function(page, idx){
        //console.log("pageArr.forEach", page.type.name)
        if(page.type.name.toLowerCase() === splitPropsUrl[2].toLowerCase()){
          returnValue = page;
          flag = true;
        }
      })
    }

    return returnValue
  }

  return (
      <>
        <div id='content'>
          {/* {propsUrl} */}
          <div>{content()}</div>
        </div>
      </>
  )
}
export default Content
