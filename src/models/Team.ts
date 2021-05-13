import mongoose from '../database'

export interface ITeam extends mongoose.Document {
    name: string,
    image: string,
    background_image: string,
    featured: boolean
}

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    background_image: {
        type: String,
        require: true
    },
    featured: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model<ITeam>('Team', TeamSchema, 'Teams')