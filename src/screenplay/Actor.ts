import { BrowseTheWeb } from './abilities/BrowseTheWeb';

export class Actor {
    private abilities: Map<string, any> = new Map();

    constructor(private name: string) {}

    can(ability: BrowseTheWeb): Actor {
        this.abilities.set('BrowseTheWeb', ability);
        return this;
    }

    using<T>(abilityClass: string): T {
        const ability = this.abilities.get(abilityClass);
        if (!ability) {
            throw new Error(`${this.name} cannot ${abilityClass} because they haven't been given that ability`);
        }
        return ability;
    }

    attemptsTo(...tasks: any[]): Promise<void> {
        return tasks.reduce(async (previous, current) => {
            await previous;
            return current.performAs(this);
        }, Promise.resolve());
    }

    async asks<T>(question: { answeredBy: (actor: Actor) => Promise<T> }): Promise<T> {
        return await question.answeredBy(this);
    }
}