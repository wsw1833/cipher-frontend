import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import codebook from '@images/codebook.png';

const characters = [
  {
    id: 1,
    name: 'Deceiver',
    description:
      'Master the Mystical Arts. Wield powerful spells to turn the tide of battle.',
    image: codebook,
  },
  {
    id: 2,
    name: 'Analyst',
    description:
      'Embrace Raw Strength. Lead the charge and conquer with sheer power.',
    image: codebook,
  },
  {
    id: 3,
    name: 'Opportunist',
    description:
      'Strike from the Shadows. Swift, cunning, and always one step ahead.',
    image: codebook,
  },
  {
    id: 4,
    name: 'Loyalist',
    description:
      'Sharpshooter Extraordinaire. Precision and agility, from a distance.',
    image: codebook,
  },
];

export default function PersonaCard() {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {characters.map((character) => (
          <Card
            key={character.id}
            className="bg-[#15130A]/60 backdrop-blur-sm border-[#262012]/50 overflow-hidden pt-6 pb-0"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-center text-amber-100 text-lg font-bold">
                {character.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="relative w-38 h-38 md:w-72 md:h-72">
                <Image
                  src={character.image || '/placeholder.svg'}
                  alt={character.name}
                  fill
                  className="rounded-[20px]"
                />
              </div>
            </CardContent>
            <CardFooter className="w-full h-[8rem] pb-0 pt-0 bg-black/80 backdrop-blur-sm">
              <p className="text-amber-200/80 text-sm text-center leading-relaxed">
                {character.description}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
