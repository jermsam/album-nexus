
import { objectType,} from 'nexus'

export default objectType({
    name: 'Mutation',
    definition(t) {
      t.crud.createOneArtist()
      t.crud.deleteOneArtist()
      t.crud.updateOneArtist()

      t.crud.createOneSong()
      t.crud.deleteOneSong()
      t.crud.updateOneSong()
    },
  })
