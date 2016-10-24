
options = [
  Ember.Object.create({
    selected: '',
    text: faker.address.streetAddress(true),
    uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
    icon: '', // 选项的Icon
    inputType: '', // 'select', 'input', 'select-input',
    inputRule: '', //输入控件初始化规则
    value: 3,
    placeholder: '',
  }),
],
nodeInfo = {
  type: 'valueMark', //select, fill,valueMark
    selectType: 'radio', //radio , checkbox , range
    showStyle: '',
    id: '001',
},

//Todo: Node - Intro 开始节点
Node_Intro = {
  "title":"Leica Deals Survey",
  "summary":"Dear Leica fan, thanks for helping us to improve Leica Deals! We have 14 questions, the survey shouldn't take more than 5 minutes to answer.",
  "description":"Thanks in advance! Andreas",
  "questionID":"ca12dd15-27af-417f-87f5-4f9a70962183",
  "images":[
    {
      "name":"63A133887EA9B3B340E6AB7495AE5257.png"
    }
  ],
  "imageName":"63A133887EA9B3B340E6AB7495AE5257.png",
  "imageUrl":"https://csvfx-files.b0.upaiyun.com/UploadFiles/PublishFiles/e82a6de4-170a-4b79-a1e5-1c17dae9ddf7/ca12dd15-27af-417f-87f5-4f9a70962183/MediaLib/",
  "cover":"https://csvfx-files.b0.upaiyun.com/UploadFiles/PublishFiles/e82a6de4-170a-4…27af-417f-87f5-4f9a70962183/MediaLib//63A133887EA9B3B340E6AB7495AE5257.png",
  "logoText":"",
  "buttonText":"",
  "theme":{
    "style":{
      "isCustom":false,
      "name":"浅色样式",
      "id":1,
      "start":{
        "textAlign":"left",
        "fontWeight":"normal",
        "fontStyle":"normal",
        "titleFontSize":"24px",
        "contentFontSize":"12px",
        "descriptionFontSize":"12px",
        "selectedColor":"rgba(202,32,29,1)",
        "color":"rgba(38,38,38,1)",
        "backgroundColor":"rgba(255,255,255,1)"
      },
      "end":{
        "textAlign":"left",
        "fontWeight":"normal",
        "fontStyle":"normal",
        "titleFontSize":"18px",
        "contentFontSize":"12px",
        "selectedColor":"rgba(202,32,29,1)",
        "color":"rgba(38,38,38,1)",
        "backgroundColor":"rgba(255,255,255,1)"
      },
      "reward":{
        "textAlign":"left",
        "fontWeight":"normal",
        "fontStyle":"normal",
        "titleFontSize":"18px",
        "contentFontSize":"12px",
        "selectedColor":"rgba(202,32,29,1)",
        "color":"rgba(38,38,38,1)",
        "backgroundColor":"rgba(255,255,255,1)"
      },
      "header":{
        "textAlign":"left",
        "fontWeight":"normal",
        "fontStyle":"normal",
        "color":"rgba(255,255,255,1)",
        "backgroundColor":"rgba(202,32,29,1)",
        "titleFontSize":"18px",
        "contentFontSize":"12px"
      },
      "option":{
        "textAlign":"left",
        "fontWeight":"normal",
        "fontStyle":"normal",
        "contentFontSize":"14px",
        "selectedColor":"rgba(202,32,29,1)",
        "color":"rgba(38,38,38,1)",
        "backgroundColor":"rgba(255,255,255,1)"
      },
      "$$hashKey":"object:851"
    },
    "theme":{
      "id":2,
      "type":"old",
      "name":"老式主题",
      "$$hashKey":"object:575"
    },
    "customs":[

    ]
  }
}

//Todo: Node - Fill 填空题
Node_Fill = {
  "questionairId": "ca12dd15-27af-417f-87f5-4f9a70962183",
  "mode": 0,
  "sortNo": 9,
  "x": 964.3686412515158,
  "y": -164.32158976805727,
  "backgroundColor": "#D95B43",
  "nodeName": "FILL_1",
  "nodeUuid": "047160FC-3BB4-4B63-B425-90DEFD37BC09",
  "type": 4,
  "categoryType": 3,
  "commonType": "SUBJECT",
  "circleNode1Id": "",
  "circleNode2Id": "",
  "parentRandomId": "",
  "order": 9,
  "destList": [
    {
      "selfPortId": "F5D721E1-6352-47FF-9A1D-E10AA865FC01",
      "destInputId": "4D020C65-C17B-4F8C-B02E-5CD326112DE3"
    }
  ],
  "used": true,
  "images": [],
  "questionText": "Pleaseenterverificationcodeandhitthesubmitbutton.",
  "questionVideoUrl": "",
  "describe": "Pleaseenterverificationcodeandhitthesubmitbutton.",
  "input": {
    "index": -2,
    "uuid": "7B71FA57-DC17-4EE5-812D-4D3ACB6ABCA9"
  },
  "output": {
    "index": -1,
    "uuid": "F5D721E1-6352-47FF-9A1D-E10AA865FC01"
  },
  "randomOptionY": "N",
  "typeText": "UI_TextNode",
  "answerRequired": "Y",
  "options": [
    {
      "nodeType": 4,
      "number": 1,
      "typeFlag": "R",
      "index": 0,
      "text": "填空题",
      "uuid": "08FBA05F-68E5-4E87-BE46-E38544DD5EF5",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1,
      "extField_5": 7,
      "extField_6": 1,
      "extField_7": 30,
      "extField_10": ""
    }
  ],
  "logicRelated": false
}

//Todo: Node - SingleSelect 选择题(单选) 有选项+备注 ， 选项 ， 备注
Node_SingleSelect = {
  "questionairId": "ca12dd15-27af-417f-87f5-4f9a70962183",
  "mode": 0,
  "sortNo": 1,
  "x": 120.36864125151567,
  "y": 441.02841023194264,
  "backgroundColor": "#5856D6",
  "nodeName": "SELECT_1",
  "nodeUuid": "59BE2153-B928-432B-AAB4-7DE578D35A94",
  "type": 1,
  "categoryType": 3,
  "commonType": "SUBJECT",
  "circleNode1Id": "",
  "circleNode2Id": "",
  "parentRandomId": "",
  "order": 1,
  "destList": [
    {
      "selfPortId": "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
      "destInputId": "2B61EA98-46F1-4A8E-B1C2-A56EF0F62E09"
    },
    {
      "selfPortId": "443E6B4F-D705-483D-905F-07E420920E19",
      "destInputId": "34C7CC7E-C1CC-463C-B994-406C4BF9D210"
    },
    {
      "selfPortId": "E97A1D7D-9117-49A9-A30B-859C9C233BB1",
      "destInputId": "36077B90-53FC-4FAE-B779-32EBDCFEE62E"
    },
    {
      "selfPortId": "7607A100-28F2-4D43-AB6E-4878DB5235B2",
      "destInputId": "77A5FD4F-572D-4544-9997-9CD63623DE27"
    }
  ],
  "used": true,
  "images": [
    {
      "id": "6AA142CA-E69C-4B36-8F5C-E4335B1CFC3F",
      "name": "77EB24894AE7BEEDDA8A4CC3C8B8EFA9.jpg",
      "originName": "text5.jpg"
    },
    {
      "id": "C9FCEDC9-CF96-489C-BB37-A2E3BE9216E2",
      "name": "8C7248DFCBC509CBFDE427F9D5AB20BC.jpeg",
      "originName": "test4.jpeg"
    },
    {
      "id": "93D01DA6-1331-4682-B463-688769DCEB45",
      "name": "BFB6C6B21BC9513EF544D1A93AE3FAA6.jpg",
      "originName": "test2.jpg"
    },
    {
      "id": "A5E3128C-F004-490B-9670-A4DACD6BBBED",
      "name": "28E8BC67DE67DD5D3757620D7D685D4F.jpg",
      "originName": "test1.jpg"
    },
    {
      "id": "8E168593-5EC0-4CC1-BC31-9F9A44F708D4",
      "name": "DF7F92FA30BE1BF1620455FF38E23126.png",
      "originName": "屏幕快照 2016-09-16 13.43.40.png"
    }
  ],
  "transitionTimeId": 1,
  "transitionTypeId": 1,
  "questionImageName": "77EB24894AE7BEEDDA8A4CC3C8B8EFA9.jpg",
  "questionImageId": "6AA142CA-E69C-4B36-8F5C-E4335B1CFC3F",
  "questionText": "新华社北京9月27日电中共中央政治局9月27日召开会议，研究全面从严治党重大问题。中共中央总书记习近平主持会议。新华社北京9月27日电中共中央政治局9月27日召开会议，研究全面从严治党重大问题。中共中央总书记习近平主持会议。新华社北京9月27日电中共中央政治局9月27日召开会议，研究全面从严治党重大问题。中共中央总书记习近平主持会议。新华社北京9月27日电中共中央政治局9月27日召开会议，研究全面从严治党重大问题。中共中央总书记习近平主持会议。新华社北京9月27日电中共中央政治局9月27日召开会议，研究全面从严治党重大问题。中共中央总书记习近平主持会议。新华社北京9月27日电中共中央政治局9月27日召开会议，研究全面从严治党重大",
  "questionVideoUrl": "",
  "describe": "会议认为，党中央就全会两个文件稿在党内一定范围征求意见，目的是充分发扬民主、集中全党智慧、凝聚全党共识把文件稿修改好。各地区各部门各方面提出了许多有价值的意见和建议。这些意见和建议，反映了全党同志对全面从严治党、加强和规范党内政治生活、加强党内监督的认识和思考，是修改好文件的重要依据。要全面梳理、逐条研究、尽量吸收，把文件制定好，为加强和规范新形势下党内政治生活、加强党内监督提供正确指导。新华社北京9月27日电中共中央政治局9月27日召开会议，研究全面从严治党重大问题。中共中央总书记习近平主持会议。新华社北京9月27日电中共中央政治局9月27日召开会议，研究全面从严治党重大问题。中共中央总书记习近平主持会",
  "input": {
    "index": -2,
    "uuid": "2B2429E1-CA70-41FD-8DA3-E02498C7FA16"
  },
  "output": {
    "index": -1,
    "uuid": "7607A100-28F2-4D43-AB6E-4878DB5235B2"
  },
  "randomOptionY": "N",
  "typeText": "选择题(单选)",
  "answerRequired": "Y",
  "options": [
    {
      "nodeType": 1,
      "number": 1,
      "typeFlag": "R",
      "index": 0,
      "text": "基本节点",
      "uuid": "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1,
      "extField_3": "N"
    },
    {
      "nodeType": 1,
      "number": 2,
      "typeFlag": "R",
      "index": 1,
      "text": "甄别节点",
      "uuid": "443E6B4F-D705-483D-905F-07E420920E19",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1,
      "extField_3": "N"
    },
    {
      "nodeType": 1,
      "number": 3,
      "typeFlag": "R",
      "index": 2,
      "text": "多选",
      "uuid": "E97A1D7D-9117-49A9-A30B-859C9C233BB1",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1,
      "extField_3": "N"
    },
    {
      "nodeType": 1,
      "number": 4,
      "typeFlag": "R",
      "index": 3,
      "text": "其他 - 选项 + 备注",
      "uuid": "D9986867-E189-4F1B-85D5-6E9177228FEE",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 3,
      "extField_8": "Y",
      "extField_4": "N",
      "extField_5": 2,
      "extField_6": 0,
      "extField_7": 50,
      "extField_10": "输入格式无效！"
    },
    {
      "nodeType": 1,
      "number": 5,
      "typeFlag": "R",
      "index": 4,
      "text": "其他 - 选项",
      "uuid": "9D82F917-B538-4EEF-B875-982B47B7D1B4",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1,
      "extField_8": "Y",
      "extField_4": "N",
      "extField_5": 7,
      "extField_6": 0,
      "extField_7": 50,
      "extField_10": "输入格式无效！"
    },
    {
      "nodeType": 1,
      "number": 6,
      "typeFlag": "R",
      "index": 5,
      "text": "其他",
      "uuid": "5037CC89-EE92-4D31-99F1-9D10E00DA8C2",
      "exclusive": "N",
      "useComment": "Y",
      "extField_9": 2,
      "extField_8": "Y",
      "extField_4": "N",
      "extField_5": 14,
      "extField_6": 0,
      "extField_7": 50,
      "extField_10": "输入格式无效！",
      "optComment": "其他 - 备注",
      "optCommentPh": "请输入备注提示",
      "extField_11": "其他 - 备注"
    }
  ],
  "extField_9": "Y",
  "extField_1": "N",
  "extField_2": 1,
  "extField_3": 2,
  "logicRelated": false
}

//Todo: Node - MulitiSelect选择题(多选)
Node_MulitiSelect = {
  "questionairId": "ca12dd15-27af-417f-87f5-4f9a70962183",
  "mode": 0,
  "sortNo": 4,
  "x": -37.63135874848433,
  "y": 108.5284102319423,
  "backgroundColor": "#5856D6",
  "nodeName": "SELECT_4",
  "nodeUuid": "55C45C3C-C433-4D19-9E46-851972D8CA0D",
  "type": 1,
  "categoryType": 3,
  "commonType": "SUBJECT",
  "circleNode1Id": "",
  "circleNode2Id": "",
  "parentRandomId": "",
  "order": 4,
  "destList": [
  {
    "selfPortId": "4EF93228-45D3-445D-A303-4C12D3A92F12",
    "destInputId": "D7033792-014F-41C4-B559-DAA3F82E4597"
  }
],
  "used": true,
  "images": [
  {
    "id": "6AA142CA-E69C-4B36-8F5C-E4335B1CFC3F",
    "name": "77EB24894AE7BEEDDA8A4CC3C8B8EFA9.jpg",
    "originName": "text5.jpg"
  },
  {
    "id": "C9FCEDC9-CF96-489C-BB37-A2E3BE9216E2",
    "name": "8C7248DFCBC509CBFDE427F9D5AB20BC.jpeg",
    "originName": "test4.jpeg"
  },
  {
    "id": "93D01DA6-1331-4682-B463-688769DCEB45",
    "name": "BFB6C6B21BC9513EF544D1A93AE3FAA6.jpg",
    "originName": "test2.jpg"
  },
  {
    "id": "A5E3128C-F004-490B-9670-A4DACD6BBBED",
    "name": "28E8BC67DE67DD5D3757620D7D685D4F.jpg",
    "originName": "test1.jpg"
  },
  {
    "id": "8E168593-5EC0-4CC1-BC31-9F9A44F708D4",
    "name": "DF7F92FA30BE1BF1620455FF38E23126.png",
    "originName": "屏幕快照 2016-09-16 13.43.40.png"
  }
],
  "transitionTimeId": 1,
  "transitionTypeId": 1,
  "questionImageName": "77EB24894AE7BEEDDA8A4CC3C8B8EFA9.jpg",
  "questionImageId": "6AA142CA-E69C-4B36-8F5C-E4335B1CFC3F",
  "questionText": "新华社北京9月27日电中共中央政治局9月27日召开会议，研究全面从严治党重大问题。中共中央总书记习近平主持会议。新华社北京9月27日电中共中央政治局9月27日召开会议，研究全面从严治党重大问题。中共中央总书记习近平主持会议。新华社北京9月27日电中共中央政治局9月27日召开会议，研究全面从严治党重大问题。中共中央总书记习近平主持会议。新华社北京9月27日电中共中央政治局9月27日召开会议，研究全面从严治党重大问题。中共中央总书记习近平主持会议。新华社北京9月27日电中共中央政治局9月27日召开会议，研究全面从严治党重大问题。中共中央总书记习近平主持会议。新华社北京9月27日电中共中央政治局9月27日召开会议，研究全面从严治党重大",
  "questionVideoUrl": "",
  "describe": "会议认为，党中央就全会两个文件稿在党内一定范围征求意见，目的是充分发扬民主、集中全党智慧、凝聚全党共识把文件稿修改好。各地区各部门各方面提出了许多有价值的意见和建议。这些意见和建议，反映了全党同志对全面从严治党、加强和规范党内政治生活、加强党内监督的认识和思考，是修改好文件的重要依据。要全面梳理、逐条研究、尽量吸收，把文件制定好，为加强和规范新形势下党内政治生活、加强党内监督提供正确指导。新华社北京9月27日电中共中央政治局9月27日召开会议，研究全面从严治党重大问题。中共中央总书记习近平主持会议。新华社北京9月27日电中共中央政治局9月27日召开会议，研究全面从严治党重大问题。中共中央总书记习近平主持会",
  "input": {
  "index": -2,
    "uuid": "36077B90-53FC-4FAE-B779-32EBDCFEE62E"
},
  "output": {
  "index": -1,
    "uuid": "4EF93228-45D3-445D-A303-4C12D3A92F12"
},
  "randomOptionY": "N",
  "optionTextOpen": "Y",
  "typeText": "选择题(多选)",
  "answerRequired": "Y",
  "options": [
  {
    "nodeType": 1,
    "number": 1,
    "typeFlag": "R",
    "index": 0,
    "text": "基本节点",
    "uuid": "B4AAD165-366C-4855-A7BA-300721E94412",
    "exclusive": "N",
    "useComment": "N",
    "extField_9": 1,
    "extField_3": "N"
  },
  {
    "nodeType": 1,
    "number": 2,
    "typeFlag": "R",
    "index": 1,
    "text": "甄别节点",
    "uuid": "EB607DB5-6F0F-49F9-9856-5D60DE953278",
    "exclusive": "N",
    "useComment": "N",
    "extField_9": 1,
    "extField_3": "N"
  },
  {
    "nodeType": 1,
    "number": 3,
    "typeFlag": "R",
    "index": 2,
    "text": "多选",
    "uuid": "C9580DC9-FEB4-4333-BF6C-079FAD152EF4",
    "exclusive": "N",
    "useComment": "N",
    "extField_9": 1,
    "extField_3": "N"
  },
  {
    "nodeType": 1,
    "number": 4,
    "typeFlag": "R",
    "index": 3,
    "text": "1",
    "uuid": "D8E287EF-FE3B-4F83-A2F3-84F52DBD774F",
    "exclusive": "N",
    "useComment": "N",
    "extField_9": 1,
    "extField_3": "N"
  },
  {
    "nodeType": 1,
    "number": 5,
    "typeFlag": "R",
    "index": 4,
    "text": "2",
    "uuid": "1E7F5871-82E3-4D7E-B415-FACBA6D5B915",
    "exclusive": "N",
    "useComment": "N",
    "extField_9": 1,
    "extField_3": "N"
  }
],
  "extField_9": "N",
  "extField_1": "Y",
  "extField_2": 1,
  "extField_3": 2,
  "logicRelated": false
}

//Todo: Node - ValueMark 打分题(分值)
Node_ValueMark = {
  "questionairId": "ca12dd15-27af-417f-87f5-4f9a70962183",
  "mode": 0,
  "sortNo": 7,
  "x": 964.3686412515158,
  "y": -490.82158976807114,
  "backgroundColor": "#62AA87",
  "nodeName": "VALUE_MARK_1",
  "nodeUuid": "EC34D8CD-EF9A-4429-8DC9-6A2141AE617A",
  "type": 2,
  "categoryType": 3,
  "commonType": "SUBJECT",
  "circleNode1Id": "",
  "circleNode2Id": "",
  "parentRandomId": "",
  "order": 7,
  "destList": [
  {
    "selfPortId": "5BC6F24D-6EBB-4086-B41C-9DC8334DCC40",
    "destInputId": "4D020C65-C17B-4F8C-B02E-5CD326112DE3"
  }
],
  "used": true,
  "images": [
  {
    "id": "6AA142CA-E69C-4B36-8F5C-E4335B1CFC3F",
    "name": "77EB24894AE7BEEDDA8A4CC3C8B8EFA9.jpg",
    "originName": "text5.jpg"
  },
  {
    "id": "93D01DA6-1331-4682-B463-688769DCEB45",
    "name": "BFB6C6B21BC9513EF544D1A93AE3FAA6.jpg",
    "originName": "test2.jpg"
  },
  {
    "id": "A5E3128C-F004-490B-9670-A4DACD6BBBED",
    "name": "28E8BC67DE67DD5D3757620D7D685D4F.jpg",
    "originName": "test1.jpg"
  }
],
  "transitionTimeId": 1,
  "transitionTypeId": 1,
  "questionImageName": "77EB24894AE7BEEDDA8A4CC3C8B8EFA9.jpg",
  "questionImageId": "6AA142CA-E69C-4B36-8F5C-E4335B1CFC3F",
  "questionText": "How likely is it that you would recommend Leica Deals to a friend or colleague?",
  "questionVideoUrl": "",
  "describe": "0 is \"not at all likely\" and 5 is \"extremely likely\"",
  "input": {
  "index": -2,
    "uuid": "6BC7FD19-45BE-438B-9607-B4087B2FA9DF"
},
  "output": {
  "index": -1,
    "uuid": "5BC6F24D-6EBB-4086-B41C-9DC8334DCC40"
},
  "randomOptionY": "N",
  "typeText": "UI_RatingNode",
  "answerRequired": "Y",
  "options": [
  {
    "nodeType": 2,
    "number": 1,
    "typeFlag": "R",
    "index": 0,
    "text": "分值-1",
    "uuid": "E195BAA5-8962-4D09-B41A-4705D6358517",
    "exclusive": "N",
    "useComment": "N",
    "extField_9": 1
  },
  {
    "nodeType": 2,
    "number": 2,
    "typeFlag": "R",
    "index": 1,
    "text": "分值-2",
    "uuid": "81DC20A5-DE77-4C69-9DE2-3F938D85C3C4",
    "exclusive": "N",
    "useComment": "N",
    "extField_9": 1
  }
],
  "extField_9": "N",
  "extField_1": 1,
  "extField_2": 3,
  "extField_3": 10,
  "extField_8": 1,
  "extField_7": "Y",
  "extField_4": "3",
  "extField_6": "10",
  "useCustomStep": true,
  "extField_10": 1,
  "logicRelated": false
}

//Todo: Node - GraphMark 打分题(图形)
Node_GraphMark = {
  "questionairId": "ca12dd15-27af-417f-87f5-4f9a70962183",
  "mode": 0,
  "sortNo": 8,
  "x": 964.3686412515158,
  "y": -337.32158976805783,
  "backgroundColor": "#62AA87",
  "nodeName": "GRAPH_MARK_1",
  "nodeUuid": "20419E6B-0243-4125-B1E3-BC96186DB791",
  "type": 2,
  "categoryType": 3,
  "commonType": "SUBJECT",
  "circleNode1Id": "",
  "circleNode2Id": "",
  "parentRandomId": "",
  "order": 8,
  "destList": [
    {
      "selfPortId": "77AAE94A-6AA3-4DDF-98B6-95BE63D0912B",
      "destInputId": "4D020C65-C17B-4F8C-B02E-5CD326112DE3"
    }
  ],
  "used": true,
  "images": [
    {
      "id": "643A81A8-4CF6-4387-AEF5-0B82C0D8761A",
      "name": "E4E091C61B1078583B846104226856B2.png",
      "originName": "屏幕快照 2016-09-20 11.54.54.png"
    },
    {
      "id": "C9FCEDC9-CF96-489C-BB37-A2E3BE9216E2",
      "name": "8C7248DFCBC509CBFDE427F9D5AB20BC.jpeg",
      "originName": "test4.jpeg"
    },
    {
      "id": "6AA142CA-E69C-4B36-8F5C-E4335B1CFC3F",
      "name": "77EB24894AE7BEEDDA8A4CC3C8B8EFA9.jpg",
      "originName": "text5.jpg"
    }
  ],
  "transitionTimeId": 1,
  "transitionTypeId": 1,
  "questionImageName": "E4E091C61B1078583B846104226856B2.png",
  "questionImageId": "643A81A8-4CF6-4387-AEF5-0B82C0D8761A",
  "questionText": "How likely is it that you would recommend Leica Deals to a friend or colleague?",
  "questionVideoUrl": "",
  "describe": "0 is \"not at all likely\" and 5 is \"extremely likely\"",
  "input": {
    "index": -2,
    "uuid": "D70B44D9-AC64-4F7D-941D-15FAC47DD259"
  },
  "output": {
    "index": -1,
    "uuid": "77AAE94A-6AA3-4DDF-98B6-95BE63D0912B"
  },
  "randomOptionY": "N",
  "typeText": "UI_RatingNode",
  "answerRequired": "Y",
  "options": [
    {
      "nodeType": 2,
      "number": 1,
      "typeFlag": "R",
      "index": 0,
      "text": "图形打分-1",
      "uuid": "90AD7AAC-E8D3-490E-BB57-169B8CA9EB29",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1
    },
    {
      "nodeType": 2,
      "number": 2,
      "typeFlag": "R",
      "index": 1,
      "text": "图形打分-2",
      "uuid": "64D5C1C0-8A40-41CA-9907-B8542643A145",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1
    },
    {
      "nodeType": 2,
      "number": 3,
      "typeFlag": "R",
      "index": 2,
      "text": "图形打分-3",
      "uuid": "7D1FA5CD-CB2C-4B96-902D-DCF61DAD89D5",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1
    }
  ],
  "extField_9": "N",
  "extField_1": 2,
  "extField_2": 2,
  "extField_3": 5,
  "logicRelated": false
}

//Todo: Node - Sequence 排序题
Node_Sequence = {
  "questionairId": "ca12dd15-27af-417f-87f5-4f9a70962183",
  "mode": 0,
  "sortNo": 10,
  "x": 964.3686412515158,
  "y": -36.47158976805747,
  "backgroundColor": "#9061C2",
  "nodeName": "SEQUENCE_1",
  "nodeUuid": "084AEDA6-839C-4865-BA0D-BE5790CF28F3",
  "type": 3,
  "categoryType": 3,
  "commonType": "SUBJECT",
  "circleNode1Id": "",
  "circleNode2Id": "",
  "parentRandomId": "",
  "order": 10,
  "destList": [
    {
      "selfPortId": "6BD628C7-1816-4C57-A0C2-EA2D3CC3F895",
      "destInputId": "4D020C65-C17B-4F8C-B02E-5CD326112DE3"
    }
  ],
  "used": true,
  "images": [
    {
      "id": "93D01DA6-1331-4682-B463-688769DCEB45",
      "name": "BFB6C6B21BC9513EF544D1A93AE3FAA6.jpg",
      "originName": "test2.jpg"
    },
    {
      "id": "A5E3128C-F004-490B-9670-A4DACD6BBBED",
      "name": "28E8BC67DE67DD5D3757620D7D685D4F.jpg",
      "originName": "test1.jpg"
    },
    {
      "id": "C9FCEDC9-CF96-489C-BB37-A2E3BE9216E2",
      "name": "8C7248DFCBC509CBFDE427F9D5AB20BC.jpeg",
      "originName": "test4.jpeg"
    }
  ],
  "transitionTimeId": 1,
  "transitionTypeId": 1,
  "questionImageName": "BFB6C6B21BC9513EF544D1A93AE3FAA6.jpg",
  "questionImageId": "93D01DA6-1331-4682-B463-688769DCEB45",
  "questionText": "New purchases: Where did you buy your last NEW Leica camera or lens?",
  "questionVideoUrl": "",
  "describe": "New purchases: Where did you buy your last NEW Leica camera or lens?",
  "input": {
    "index": -2,
    "uuid": "428FFE1E-A539-46CA-B015-9F691339E87D"
  },
  "output": {
    "index": -1,
    "uuid": "6BD628C7-1816-4C57-A0C2-EA2D3CC3F895"
  },
  "randomOptionY": "N",
  "typeText": "排序题",
  "answerRequired": "Y",
  "options": [
    {
      "nodeType": 3,
      "number": 1,
      "typeFlag": "R",
      "index": 0,
      "text": "Leica specialist dealer (retail store)",
      "uuid": "CE119359-C3DF-4BB5-9A88-988247412F5B",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1,
      "extField_1": "N"
    },
    {
      "nodeType": 3,
      "number": 2,
      "typeFlag": "R",
      "index": 1,
      "text": "Leica specialist dealer (online store)",
      "uuid": "DB8EC729-9CCE-4888-88E4-E1BA17010077",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1,
      "extField_1": "N"
    },
    {
      "nodeType": 3,
      "number": 3,
      "typeFlag": "R",
      "index": 2,
      "text": "Amazon",
      "uuid": "1041B863-8ABC-452D-8653-438376A09CD9",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1,
      "extField_1": "N"
    },
    {
      "nodeType": 3,
      "number": 4,
      "typeFlag": "R",
      "index": 3,
      "text": "eBay",
      "uuid": "49C4F5A9-1677-41D1-A531-BCAB438C437E",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1,
      "extField_1": "N"
    },
    {
      "nodeType": 3,
      "number": 5,
      "typeFlag": "R",
      "index": 4,
      "text": "Different online store",
      "uuid": "763BA2FE-A97E-4147-9F89-4A5FACC32355",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1,
      "extField_1": "N"
    },
    {
      "nodeType": 3,
      "number": 6,
      "typeFlag": "R",
      "index": 5,
      "text": "Leica specialist dealer1",
      "uuid": "AFE02709-C519-4CF6-A3D7-4764FA24ABCF",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1,
      "extField_1": "N"
    },
    {
      "nodeType": 3,
      "number": 7,
      "typeFlag": "R",
      "index": 6,
      "text": "Leica specialist dealer2",
      "uuid": "1D1921E9-CD05-47A5-9EEC-191F159DC93A",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1,
      "extField_1": "N"
    },
    {
      "nodeType": 3,
      "number": 8,
      "typeFlag": "R",
      "index": 7,
      "text": "Leica specialist dealer3",
      "uuid": "6FD5C06F-BB92-4C68-8E9C-FFCCDFDC0434",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1,
      "extField_1": "N"
    },
    {
      "nodeType": 3,
      "number": 9,
      "typeFlag": "R",
      "index": 8,
      "text": "Leica specialist dealer4",
      "uuid": "20D7C4CD-F353-4CDE-A19B-1828C2FF267F",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1,
      "extField_1": "N"
    },
    {
      "nodeType": 3,
      "number": 10,
      "typeFlag": "R",
      "index": 9,
      "text": "Leica specialist dealer5",
      "uuid": "0F0940CF-CE38-4223-AA7F-B1D55F13E7CB",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1,
      "extField_1": "N"
    },
    {
      "nodeType": 3,
      "number": 11,
      "typeFlag": "R",
      "index": 10,
      "text": "Leica specialist dealer6",
      "uuid": "61C4B05D-B12D-4239-9D64-BD8DAE25D87A",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1,
      "extField_1": "N"
    },
    {
      "nodeType": 3,
      "number": 12,
      "typeFlag": "R",
      "index": 11,
      "text": "Leica specialist dealer7",
      "uuid": "FDB02717-BBFA-4EC3-AF14-2488839BE8A0",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1,
      "extField_1": "N"
    },
    {
      "nodeType": 3,
      "number": 13,
      "typeFlag": "R",
      "index": 12,
      "text": "Leica specialist dealer8",
      "uuid": "E3F2A68B-F1F0-4C25-A023-A4733B0341D2",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1,
      "extField_1": "N"
    },
    {
      "nodeType": 3,
      "number": 14,
      "typeFlag": "R",
      "index": 13,
      "text": "Leica specialist dealer9",
      "uuid": "B6E69B7F-E724-468C-84B0-0240A9756762",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1,
      "extField_1": "N"
    },
    {
      "nodeType": 3,
      "number": 15,
      "typeFlag": "R",
      "index": 14,
      "text": "Leica specialist dealer10",
      "uuid": "61C14615-BBFF-428B-BA11-C0A66642EB2D",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1,
      "extField_1": "N"
    }
  ],
  "extField_9": "N",
  "useCustomCount": false,
  "extField_1": 15,
  "logicRelated": false
}

//Todo: Node - SelectPic 图片题
Node_SelectPic = {
  "questionairId": "ca12dd15-27af-417f-87f5-4f9a70962183",
  "mode": 0,
  "sortNo": 13,
  "x": 1461.0686412515138,
  "y": -490.82158976807114,
  "backgroundColor": "#34AADC",
  "nodeName": "SELECT_PIC_1",
  "nodeUuid": "0C1521AD-B726-4F8F-ACF0-A5425ED64599",
  "type": 23,
  "categoryType": 3,
  "commonType": "SUBJECT",
  "circleNode1Id": "",
  "circleNode2Id": "",
  "parentRandomId": "",
  "order": 13,
  "destList": [
    {
      "selfPortId": "8DA83A52-B605-429C-845C-F54B75F2929B",
      "destInputId": "4D020C65-C17B-4F8C-B02E-5CD326112DE3"
    }
  ],
  "used": true,
  "images": [],
  "questionText": "On which eBay sites do you look for interesting offers?",
  "questionVideoUrl": "",
  "describe": "Row Image Select",
  "input": {
    "index": -2,
    "uuid": "CEAEBD5B-6608-4950-B7AC-A3E71C88AB9F"
  },
  "output": {
    "index": -1,
    "uuid": "8DA83A52-B605-429C-845C-F54B75F2929B"
  },
  "randomOptionY": "N",
  "typeText": "图片选择题(单选)",
  "answerRequired": "Y",
  "options": [
    {
      "nodeType": 23,
      "number": 1,
      "typeFlag": "R",
      "index": 0,
      "text": "Only the national eBay website (e.g. eBay USA or eBay UK)",
      "uuid": "6A26C8B9-4D91-4CC4-A323-22EACF28130E",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1,
      "imageId": "B30DEDFD-E9BE-4E00-81FF-B5EA5597F905",
      "imageName": "63A133887EA9B3B340E6AB7495AE5257.png",
      "imageOriginName": "屏幕快照 2016-09-29 11.21.12.png",
      "extField_3": "N"
    },
    {
      "nodeType": 23,
      "number": 2,
      "typeFlag": "R",
      "index": 1,
      "text": "Also on eBay sites with same language (e.g. eBay Canada, Australia etc.)",
      "uuid": "F9C137CB-5329-40E4-AD34-25DE115D531A",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1,
      "imageId": "C9FCEDC9-CF96-489C-BB37-A2E3BE9216E2",
      "imageName": "8C7248DFCBC509CBFDE427F9D5AB20BC.jpeg",
      "imageOriginName": "test4.jpeg",
      "extField_3": "N"
    },
    {
      "nodeType": 23,
      "number": 3,
      "typeFlag": "R",
      "index": 2,
      "text": "Master Slider includes 8 starter templates.  The hardest part is deciding which one is perfect for your WordPress site. Once you decide, simply just replace the placeholder images and content with you",
      "uuid": "536326C7-8E6A-4191-AC35-D4B75C0A1250",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1,
      "imageId": "93D01DA6-1331-4682-B463-688769DCEB45",
      "imageName": "BFB6C6B21BC9513EF544D1A93AE3FAA6.jpg",
      "imageOriginName": "test2.jpg",
      "extField_3": "N"
    },
    {
      "nodeType": 23,
      "number": 4,
      "typeFlag": "R",
      "index": 3,
      "text": "Also on international websites (e.g. eBay Germany, France, Italy etc.)",
      "uuid": "CEE9AA12-6062-40FB-956D-4A461C9DB14C",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1,
      "imageId": "A5E3128C-F004-490B-9670-A4DACD6BBBED",
      "imageName": "28E8BC67DE67DD5D3757620D7D685D4F.jpg",
      "imageOriginName": "test1.jpg",
      "extField_3": "N"
    },
    {
      "nodeType": 23,
      "number": 5,
      "typeFlag": "R",
      "index": 4,
      "text": "n/a",
      "uuid": "0B485D1B-673B-4E81-B721-5FA1564556CF",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1,
      "imageId": "643A81A8-4CF6-4387-AEF5-0B82C0D8761A",
      "imageName": "E4E091C61B1078583B846104226856B2.png",
      "imageOriginName": "屏幕快照 2016-09-20 11.54.54.png",
      "extField_3": "N"
    }
  ],
  "extField_1": "N",
  "extField_2": 1,
  "extField_3": 2,
  "extField_4": 1,
  "extField_5": 1,
  "extField_7": 2,
  "logicRelated": false
}

//Todo: Node - Upload 上传题
Node_Upload = {
  "questionairId": "ca12dd15-27af-417f-87f5-4f9a70962183",
  "mode": 0,
  "sortNo": 19,
  "x": 1694.6550048879667,
  "y": -408.20795340370444,
  "backgroundColor": "#AD7F6C",
  "nodeName": "UPLOAD_1",
  "nodeUuid": "45583E0B-EB5D-41D2-A2B6-9A2D57D7B092",
  "type": 29,
  "categoryType": 3,
  "commonType": "SUBJECT",
  "circleNode1Id": "",
  "circleNode2Id": "",
  "parentRandomId": "",
  "order": 19,
  "destList": [
    {
      "selfPortId": "32A08ECB-36FB-4B45-85C7-2DC3B14081E3",
      "destInputId": "4D020C65-C17B-4F8C-B02E-5CD326112DE3"
    }
  ],
  "used": true,
  "images": [
    {
      "id": "6AA142CA-E69C-4B36-8F5C-E4335B1CFC3F",
      "name": "77EB24894AE7BEEDDA8A4CC3C8B8EFA9.jpg",
      "originName": "text5.jpg"
    },
    {
      "id": "643A81A8-4CF6-4387-AEF5-0B82C0D8761A",
      "name": "E4E091C61B1078583B846104226856B2.png",
      "originName": "屏幕快照 2016-09-20 11.54.54.png"
    },
    {
      "id": "A5E3128C-F004-490B-9670-A4DACD6BBBED",
      "name": "28E8BC67DE67DD5D3757620D7D685D4F.jpg",
      "originName": "test1.jpg"
    },
    {
      "id": "93D01DA6-1331-4682-B463-688769DCEB45",
      "name": "BFB6C6B21BC9513EF544D1A93AE3FAA6.jpg",
      "originName": "test2.jpg"
    }
  ],
  "transitionTimeId": 1,
  "transitionTypeId": 1,
  "questionImageName": "77EB24894AE7BEEDDA8A4CC3C8B8EFA9.jpg",
  "questionImageId": "6AA142CA-E69C-4B36-8F5C-E4335B1CFC3F",
  "questionText": "You can upload images",
  "questionVideoUrl": "",
  "describe": "upload",
  "input": {
    "index": -2,
    "uuid": "E8CD735F-CA04-4761-8FA4-2C7783347EA5"
  },
  "output": {
    "index": -1,
    "uuid": "32A08ECB-36FB-4B45-85C7-2DC3B14081E3"
  },
  "randomOptionY": "N",
  "typeText": "",
  "answerRequired": "Y",
  "options": [
    {
      "nodeType": 29,
      "number": 1,
      "typeFlag": "R",
      "index": 0,
      "text": "请点击上传图片1",
      "uuid": "68D68A1A-F3D3-46D9-AD60-3DAD17C2486F",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1
    },
    {
      "nodeType": 29,
      "number": 2,
      "typeFlag": "R",
      "index": 1,
      "text": "请点击上传图片2",
      "uuid": "04BA29F8-D56D-4D93-8FC7-5ACA97CC7B22",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1
    },
    {
      "nodeType": 29,
      "number": 3,
      "typeFlag": "R",
      "index": 2,
      "text": "请点击上传图片3",
      "uuid": "D4FA0F25-3DA7-46DE-965A-F245540E5B18",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1
    }
  ],
  "extField_1": "N",
  "logicRelated": false
}

//Todo: Node - Locate 定位题
Node_Locate = {
  "questionairId": "ca12dd15-27af-417f-87f5-4f9a70962183",
  "mode": 0,
  "sortNo": 20,
  "x": 1694.1550048879667,
  "y": -225.0715897680575,
  "backgroundColor": "#DCB05A",
  "nodeName": "LOCATE_1",
  "nodeUuid": "586E526C-A470-4CAC-BA9F-B0E2CC14B2DA",
  "type": 28,
  "categoryType": 4,
  "commonType": "INFO",
  "circleNode1Id": "",
  "circleNode2Id": "",
  "parentRandomId": "",
  "order": 20,
  "destList": [
    {
      "selfPortId": "475C786D-919C-4307-8416-497C8D9056EC",
      "destInputId": "4D020C65-C17B-4F8C-B02E-5CD326112DE3"
    }
  ],
  "used": true,
  "images": [],
  "questionText": "Please select the current location",
  "questionVideoUrl": "",
  "describe": "lcoation",
  "input": {
    "index": -2,
    "uuid": "2F691DBA-4F8B-40CA-AE41-6B8A331EFB99"
  },
  "output": {
    "index": -1,
    "uuid": "475C786D-919C-4307-8416-497C8D9056EC"
  },
  "randomOptionY": "N",
  "typeText": "",
  "answerRequired": "Y",
  "options": [],
  "extField_9": "N",
  "extField_4": 1,
  "grades": 1,
  "extField_5": "Y",
  "logicRelated": false
}

//Todo: Node - Matrix 矩阵题
Node_Matrix = {
  "questionairId": "ca12dd15-27af-417f-87f5-4f9a70962183",
  "mode": 0,
  "sortNo": 21,
  "x": 1694.4050048879667,
  "y": -148.5215897680573,
  "backgroundColor": "#2980b9",
  "nodeName": "MATRIX_1",
  "nodeUuid": "95C94BA2-F444-4D6E-95C8-CBFA3411F560",
  "type": 5,
  "categoryType": 3,
  "commonType": "SUBJECT",
  "circleNode1Id": "",
  "circleNode2Id": "",
  "parentRandomId": "",
  "order": 21,
  "destList": [
    {
      "selfPortId": "D22DED71-5556-40E6-A1A0-D0EE08D9F234",
      "destInputId": "4D020C65-C17B-4F8C-B02E-5CD326112DE3"
    }
  ],
  "used": true,
  "images": [],
  "questionText": "On which eBay sites do you look for interesting offers?",
  "questionVideoUrl": "",
  "describe": "On which eBay sites do you look for interesting offers?On which eBay sites do you look for interesting offers?",
  "input": {
    "index": -2,
    "uuid": "6F641E9C-9184-486A-8179-0DA183725929"
  },
  "output": {
    "index": -1,
    "uuid": "D22DED71-5556-40E6-A1A0-D0EE08D9F234"
  },
  "randomOptionY": "N",
  "typeText": "矩阵题(打分)",
  "answerRequired": "Y",
  "optionsX": [
    {
      "nodeType": 5,
      "number": 1,
      "typeFlag": "C",
      "index": 0,
      "text": "col1col1col1col1",
      "uuid": "6512F04B-2742-4942-B77C-E8A8A7D20E83",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1
    },
    {
      "nodeType": 5,
      "number": 2,
      "typeFlag": "C",
      "index": 1,
      "text": "col2col2col2col2col2col2col2col2col2col2col2col2col2col2col2col2col2col2col2col2col2col2col2col2col2",
      "uuid": "0A7E44AB-6843-4350-83EF-BBCF9DC0B465",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1
    },
    {
      "nodeType": 5,
      "number": 3,
      "typeFlag": "C",
      "index": 2,
      "text": "col3",
      "uuid": "E93FEAEA-E58B-4C60-ACDB-460EBCB1D3EF",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1
    },
    {
      "nodeType": 5,
      "number": 4,
      "typeFlag": "C",
      "index": 3,
      "text": "col4",
      "uuid": "28EC73A4-CA6C-4933-B904-E73BFB07D251",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1
    }
  ],
  "optionsY": [
    {
      "nodeType": 5,
      "number": 1,
      "typeFlag": "R",
      "index": 0,
      "text": "row1",
      "uuid": "21978E3A-A952-4740-98D0-E52ACD12B790",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1
    },
    {
      "nodeType": 5,
      "number": 2,
      "typeFlag": "R",
      "index": 1,
      "text": "row2row2row2row2row2row2row2row2row2row2row2row2row2row2row2",
      "uuid": "8AE3228F-C5B6-4703-934E-B9B52A05B690",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1
    },
    {
      "nodeType": 5,
      "number": 3,
      "typeFlag": "R",
      "index": 2,
      "text": "row3",
      "uuid": "183F806A-9F35-44ED-AB8B-DB949AD2FA4D",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1
    },
    {
      "nodeType": 5,
      "number": 4,
      "typeFlag": "R",
      "index": 3,
      "text": "row4",
      "uuid": "BE324FD3-AE45-4707-BA01-667F026039C8",
      "exclusive": "N",
      "useComment": "N",
      "extField_9": 1
    }
  ],
  "otherOptions": [],
  "extField_1": 1,
  "extField_2": 2,
  "extField_3": 1,
  "extField_4": 1,
  "extField_5": 2,
  "extField_6": 1,
  "extField_9": "N",
  "logicRelated": false,
  "options": [
    {
      "uuid": "6512F04B-2742-4942-B77C-E8A8A7D20E83-21978E3A-A952-4740-98D0-E52ACD12B790"
    },
    {
      "uuid": "6512F04B-2742-4942-B77C-E8A8A7D20E83-8AE3228F-C5B6-4703-934E-B9B52A05B690"
    },
    {
      "uuid": "6512F04B-2742-4942-B77C-E8A8A7D20E83-183F806A-9F35-44ED-AB8B-DB949AD2FA4D"
    },
    {
      "uuid": "6512F04B-2742-4942-B77C-E8A8A7D20E83-BE324FD3-AE45-4707-BA01-667F026039C8"
    },
    {
      "uuid": "0A7E44AB-6843-4350-83EF-BBCF9DC0B465-21978E3A-A952-4740-98D0-E52ACD12B790"
    },
    {
      "uuid": "0A7E44AB-6843-4350-83EF-BBCF9DC0B465-8AE3228F-C5B6-4703-934E-B9B52A05B690"
    },
    {
      "uuid": "0A7E44AB-6843-4350-83EF-BBCF9DC0B465-183F806A-9F35-44ED-AB8B-DB949AD2FA4D"
    },
    {
      "uuid": "0A7E44AB-6843-4350-83EF-BBCF9DC0B465-BE324FD3-AE45-4707-BA01-667F026039C8"
    },
    {
      "uuid": "E93FEAEA-E58B-4C60-ACDB-460EBCB1D3EF-21978E3A-A952-4740-98D0-E52ACD12B790"
    },
    {
      "uuid": "E93FEAEA-E58B-4C60-ACDB-460EBCB1D3EF-8AE3228F-C5B6-4703-934E-B9B52A05B690"
    },
    {
      "uuid": "E93FEAEA-E58B-4C60-ACDB-460EBCB1D3EF-183F806A-9F35-44ED-AB8B-DB949AD2FA4D"
    },
    {
      "uuid": "E93FEAEA-E58B-4C60-ACDB-460EBCB1D3EF-BE324FD3-AE45-4707-BA01-667F026039C8"
    },
    {
      "uuid": "28EC73A4-CA6C-4933-B904-E73BFB07D251-21978E3A-A952-4740-98D0-E52ACD12B790"
    },
    {
      "uuid": "28EC73A4-CA6C-4933-B904-E73BFB07D251-8AE3228F-C5B6-4703-934E-B9B52A05B690"
    },
    {
      "uuid": "28EC73A4-CA6C-4933-B904-E73BFB07D251-183F806A-9F35-44ED-AB8B-DB949AD2FA4D"
    },
    {
      "uuid": "28EC73A4-CA6C-4933-B904-E73BFB07D251-BE324FD3-AE45-4707-BA01-667F026039C8"
    }
  ]
}
