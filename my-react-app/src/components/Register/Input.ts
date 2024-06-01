export class Input {
    title: string;
    name: string;
    type?: string;
    required?: {
        value: boolean,
        message: string 
    };
    validate?: Function

    constructor(
        title: string, 
        name: string, 
        type?: string,
        required?: {value: boolean, message: string }, 
        validate?: Function) {

        this.title = title;
        this.name = name;
        this.type=type;
        this.required = required;
        this.validate = validate;
    }
}

export class InputOptions extends Input {
    options: string[];

    constructor(
        title: string, 
        name: string, 
        options: string[],
        required?: {value: boolean, message: string }, 
        validate?: Function) {

        super(title, name, 'dropdown', required, validate);
        this.options = options;
    }
}
