// Budget Controller
//module for calculating budget and adding new item to data structure
var budgetController = (function() {
  var Expense = function(id,description,value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;    
  };
  
  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };
  
  return {
    addItem: function(type, des, val) {
      var newItem, ID;
      
      // Create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;

      } else {
        ID = 0;
      }
      
      console.log(ID);
      // Create new item based on 'income' or 'expense'
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
        console.log(newItem);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }
      
      // Push new item into data stucture
      //console.log(data.allItems);
      data.allItems[type].push(newItem);
      return newItem;
    },
    testing: function() {
      console.log(data); 
    },
  };  
})();

// UI Controller
//module for adding ,i/p and updating through UI
var UIController = (function() {
  var DOMStrings = {
    inputType: '.add__type',
    inputDesc: '.add__description',
    inputValue: '.add__value',
    inputButton: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'
  };
  
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDesc).value,
        value: document.querySelector(DOMStrings.inputValue).value,
      };
    },
    
    addListItem: function(obj,type) {
      var html, newHtml, elem;
      // Create html string with placeholder text
      if (type === 'inc') {
        elem = DOMStrings.incomeContainer;
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'  
      } else if (type === 'exp') {
        elem = DOMStrings.expensesContainer;
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'  
      }
      
      // Replace placeholders with actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);
      
      // Insert the HTML into the DOM
      document.querySelector(elem).insertAdjacentHTML('beforeend', newHtml);
    },
    
    getDomStrings: function() {
      return DOMStrings;
    }
  };
})();

// Global App Controller
//module to connect budgetController and uiController modules
//global app controller
var controller = (function(budgetCtrlr, UICtrlr) {
  var setupEventListeners = function() {
    var dom = UICtrlr.getDomStrings();
    
    document.querySelector(dom.inputButton).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function(event){
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };
  
  var ctrlAddItem = function () {
    var input, newItem;
    
    // 1. Get fields' input data
    input = UICtrlr.getInput();
    
    // 2. Add the item to the budget controller
    newItem = budgetCtrlr.addItem(input.type, input.description, input.value);

    // 3. Add the item to the item UI
    UIController.addListItem(newItem,input.type);
    
    // 4. Calculate the budget
    // 5. Display the budget on the UI    
    console.log(input);
  };
  
  return {
    init: function(){
      console.log('This application has started!');
      setupEventListeners();
    },
  }
})(budgetController, UIController);

controller.init();
