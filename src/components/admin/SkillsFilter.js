import React from 'react';
import RefData from './RefData';

// the skills filter component. this can be laid out much better in a 'React'
// way. there are design patterns you can apply to layout out your React classes.
// however, i'm not worried, as the intention here is to show you ag-Grid
// working with React, and that's all. i'm not looking for any awards for my
// React design skills.
export default class SkillsFilter extends React.Component {

    constructor() {
        super();
        this.state = {
            skills: RefData.IT_SKILLS,
            skillNames: RefData.IT_SKILLS_NAMES,
            android: false,
            css: false,
            html5: false,
            mac: false,
            windows: false
        };
    }

    // called by agGrid
    init(params) {
        this.filterChangedCallback = params.filterChangedCallback;
    }

    // called by agGrid
    doesFilterPass(params) {

        var rowSkills = params.data.skills;
        var passed = true;

        this.state.skills.forEach( (skill) => {
            if (this.state[skill]) {
                if (!rowSkills[skill]) {
                    passed = false;
                }
            }
        });

        return passed;
    };

    // called by agGrid
    isFilterActive() {
        var somethingSelected = this.state.android || this.state.css ||
            this.state.html5 || this.state.mac || this.state.windows;
        return somethingSelected;
    };

    onSkillChanged(skill, event) {
        var newValue = event.target.checked;
        var newModel = {};
        newModel[skill] = newValue;
        this.setState(newModel, ()=> {this.filterChangedCallback();} );
    }

    render() {

        var skillsTemplates = [];
        this.state.skills.forEach( (skill, index) => {

            var skillName = this.state.skillNames[index];
            var template = (
                <label key={skill} style={{border: '1px solid lightgrey', margin: 4, padding: 4, display: 'inline-block'}}>
                    <span>
                        <div style={{textAlign: 'center'}}>{skillName}</div>
                        <div>
                            <input type="checkbox" onClick={this.onSkillChanged.bind(this, skill)}/>
                            <img src={'images/skills/'+skill+'.png'} width={30}/>
                        </div>
                    </span>
                </label>
            );

            skillsTemplates.push(template);
        });

        return (
            <div style={{width: 380}}>
                <div style={{textAlign: 'center', background: 'lightgray', width: '100%', display: 'block', borderBottom: '1px solid grey'}}>
                    <b>Custom Skills Filter</b>
                </div>
                {skillsTemplates}
            </div>
        );
    }

    // these are other method that agGrid calls that we
    // could of implemented, but they are optional and
    // we have no use for them in this particular filter.
    //getApi() {}
    //afterGuiAttached(params) {}
    //onNewRowsLoaded() {}
    //onAnyFilterChanged() {}
}
