import { useSelector } from 'react-redux'
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material'

import { commonBoxSx } from '../themeAndStyles'

const CastingTotals = ({ id }) => {
  const character = useSelector((state) =>
    state.characters.find((c) => c._id === id)
  )
  if (!character) return null

  const finesse = parseInt(
    character.abilities.find((abi) => abi.ability === 'Finesse')?.score
  )
  const awareness = parseInt(
    character.abilities.find((abi) => abi.ability === 'Awareness')?.score
  )
  const parmaMagica = parseInt(
    character.abilities.find((abi) => abi.ability === 'Parma Magica')?.score
  )
  const concentration = parseInt(
    character.abilities.find((abi) => abi.ability === 'Concentration')?.score
  )
  const quickness = parseInt(
    character.characteristics.find((chr) => chr.characteristic === 'Quickness')
      ?.score
  )
  const perception = parseInt(
    character.characteristics.find((chr) => chr.characteristic === 'Perception')
      ?.score
  )
  const stamina = parseInt(
    character.characteristics.find((chr) => chr.characteristic === 'Stamina')
      ?.score
  )
  const intelligence = parseInt(
    character.characteristics.find(
      (chr) => chr.characteristic === 'Intelligence'
    )?.score
  )

  const castingNotes = [
    'Formulaic: Technique + Form + Sta + Aura + Die',
    'Ritual: Technique + Form + Sta + Aura + Artes Lib. + Philos. + die',
    'Spontaneous (Fatigue): (Technique + Form + Sta + Aura + stress die)/2',
    'Spontaneous (No Fatigue): (Technique + Form + Sta + Aura)/5',
  ]

  const castingTotals = [
    {
      primary: 'Fast Casting Speed',
      secondary: '(+ stress die)',
      add: 'Qik + Finesse =',
      total: (quickness + finesse).toString(),
    },
    {
      primary: 'Determining Effect',
      secondary: '(+ die, vs 15-magnitude)',
      add: 'Per + Awareness =',
      total: (perception + awareness).toString(),
    },
    {
      primary: 'Base Targeting',
      secondary: '(+ die)',
      add: 'Per + Finesse =',
      total: (perception + finesse).toString(),
    },
    {
      primary: 'Concentration',
      secondary: '(+ die)',
      add: 'Sta + Concentration =',
      total: (stamina + concentration).toString(),
    },
    {
      primary: 'Magic Resistance',
      secondary: '(+ Form)',
      add: 'Parma magica x5 =',
      total: (parmaMagica * 5).toString(),
    },
    {
      primary: 'Multiple Casting',
      secondary: '(+ stress die - no. of spells, vs 9)',
      add: 'Int + Finesse =',
      total: (intelligence + finesse).toString(),
    },
  ]

  return (
    <Box sx={commonBoxSx}>
      <Typography variant="label">Base Casting Totals</Typography>
      {castingNotes.map((note) => (
        <Typography
          key={note}
          color="info.main"
          sx={{ fontSize: '14px', ml: 2, mr: 2, mb: 0.3 }}
        >
          {note}
        </Typography>
      ))}
      <List>
        {castingTotals.map((total) => (
          <ListItem key={total.primary}>
            <ListItemText primary={total.primary} secondary={total.secondary} />
            <ListItemText secondary={total.add} />
            <ListItemText primary={total.total} />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default CastingTotals
