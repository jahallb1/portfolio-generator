const inquirer = require('inquirer');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username (Required)',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please enter your github id!');
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
         },  
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({ confirmAbout }) => confirmAbout
        }
         
    ])
    
};


const promptProject = portfolioData => {
    if (!portfolioData.projects) {
        portfolioData.projects= [];
    };
    console.log(`
    =================
    Add a New Project
    =================
    `);
      return inquirer.prompt([
          {
              type: 'input',
              name: 'name',
              message: 'What is the name of your project? (Required)',
              validate: projectNameInput => {
                  if (projectNameInput) {
                      return true;
                  } else {
                      console.log('Please enter your projcet name!');
                      return false;
                  }
              } 
          },
          {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log('Please enter a description!');
                    return false;
                }
            }
          },
          {
              type: 'checkbox',
              name: 'languages',
              message: 'What did use with this project? (Check all that apply)',
              choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
          },
          {
              type: 'input',
              name: 'link',
              message: 'Would you like to feature this project (Required)',
              validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log('Please enter a description!');
                    return false;
                }
            }
          },
          {
              type: 'confirm',
              name: 'confirmAddProject',
              message: 'Would you like to enter another project?',
              default: false
          }
      ])
      .then(projectData => {
          portfolioData.projects.push(projectData);
            if (projectData.confirmAddProject) {
                return promptProject(portfolioData);
            } else {
                return portfolioData;
            }
        
      });
      
};


promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
    });
    


// const fs = require('fs');

// const generatePage = require('./src/page-template.js');

// const profileDateArgs = process.argv.slice(2);

// const [name, github] = profileDateArgs;


// fs.writeFile('./index.html', generatePage(name, github), err => {
//     if (err) throw new Error(err);

//     console.log('Portfolio complete! Check out index.html to see the output!');
// });
