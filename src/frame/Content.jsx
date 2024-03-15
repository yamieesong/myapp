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

  let gagevuePageArr = [
    <UserInfo/>,
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
      console.log("gagevuePageArr", gagevuePageArr)
      gagevuePageArr.forEach(function(gagevue, idx){
        console.log("gagevuePageArr.forEach", gagevue.type.name)
        if(gagevue.type.name.toLowerCase() === propsUrl){
          returnValue = gagevue;
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
