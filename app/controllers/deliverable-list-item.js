/**
 * Created by chshipma on 4/1/14.
 */
export default Ember.ObjectController.extend({

    // TODO: Devise a method to make the dynamic tooltips administratable
    // TODO: Cleanup layout of dynamic tooltips

    actionColumn: function(){
        return this.get('model.modelIsDirty') ? "col-md-1":false;
    }.property('model.modelIsDirty'),

    actions:{
        saveDeliverable: function(){
            this.get('model').save();
        },

        revertDeliverable: function(){
            this.get('model').rollback();
        },

        removeDeliverable: function(){
            var self = this;
            this.get('model').deleteRecord();
            this.get('model').save().then(function(){
                self.send('reloadDeliverables');
            });
        }
    },

    modalityTooltipContent: function(){
        switch( this.get('model.jobModality.id') )
        {
            case "30":	// ILT
                return "Is the training to be delivered LIVE and in real-time, irrespective of how?<br/><br/> <strong>EXAMPLE:</strong> <em>Classroom, TelePresence, WebEx?</em>";

            case "220":	// Community
                return "Is the request not for training as such, but for provision of an online community in WebEx Social?<br/><br/> <strong>EXAMPLE:</strong> <em>Community Strategy and Community Setup</em>";

            case "27":	// Guides
                return "Is the request not for training as such, but for provision of information either to exist in its own right or in support of existing or requested training?<br/><br/> <strong>EXAMPLE:</strong> <em>Powerpoint slides, step-by-step Job Aid (Word Doc or PDF), Ezine</em>";

            case "25":	// WBT
                return "Is the training to be delivered <strong>RECORDED</strong> and available for &quot;Just-In-Time&quot; use, irrespective of how?<br/><br/> <strong>EXAMPLE:</strong> <em>Video, Recorded TP, online courseware, animations with voiceover, etc?</em>";

            default:
                return "This is a <b>context sensative tooltip</b>, it will change <b>based on the modality selected</b>. Choose a modality and look at me again.";
        }

    }.property('model.jobModality.id'),

    complexityTooltipContent: function(){


        switch( this.get('model.jobModality.id') )
        {
            case "30":	// ILT
                switch( this.get('model.jobComplexity.id') )
                {
                    case "93":	// LOW
                        return "Instructor performs transfer of information only. Instructor will present instructionally designed PPT slides to a learner audience. No class activities or discussion.";
                        break;

                    case "94":	// MED
                        return "Instructor presents learning material, and engages class in one or two interactive exercises, class discussions, or video.";
                        break;

                    case "95":	// HIGH
                        return "Instructor will present material, and engage learners in many complex learning activities, including discussions, working groups, projects, role-plays and simulations.";
                        break;
                }
                break;

            case "220":	// Community
                switch( this.get('model.jobComplexity.id') )
                {
                    case "93":	// LOW
                        return "Consult with business stakeholders to design use and setup of WebEx Social Community. No building of communities will be done by Talent Management, as this will be done by the IT group with funding from stakeholders.";
                        break;

                    case "94":	// MED
                        return "Consult with business stakeholders to design use and setup of WebEx Social Community and build using existing Talent Management community templates or existing Talent Management community structures.";
                        break;

                    case "95":	// HIGH
                        return "Consult with business stakeholders to design use and setup of WebEx Social Community and custom build from scratch using custom layouts and code.";
                        break;
                }
                break;

            case "27":	// Guides
                switch( this.get('model.jobComplexity.id') )
                {
                    case "93":	// LOW
                        return "Simple text and graphics built in Microsoft Word and output to PDF.<br/><br/> <strong>Example:</strong> <em>Step-by-step software Job Aid</em>";
                        break;

                    case "94":	// MED
                        return "";
                        break;

                    case "95":	// HIGH
                        return "High end text and graphics, in a magazine-style layout with possible use of video and multimedia.<br/><br/> <strong>EXAMPLE:</strong> <em>eZine (e-Magazine)</em>";
                        break;
                }
                break;

            case "25":	// WBT
                switch( this.get('model.jobComplexity.id') )
                {
                    case "93":	// LOW
                        return "Simple online animated powerpoint with narration that plays for the learner. No video or interactivity.";
                        break;

                    case "94":	// MED
                        return "Animated online courseware that can include minimal simple video (talking head) and interactivity (click-to-reveal, multiple choice knowledge checks, etc.).";
                        break;

                    case "95":	// HIGH
                        return "Online courseware that features custom animation, video, and interactivity. Can include software or skill simulations.<br/><br/> <strong>Example:</strong> <em>QuickStart, custom Flash courseware</em>";
                        break;
                }
                break;

            default:
                return "This is a <b>context sensative tooltip</b>, it will change based on the <b>modality and complexity</b> selected. Choose a modality and a complexity level, then look at me again.";
                break;
        }
    }.property('model.jobComplexity.id', 'model.jobModality.id')
});