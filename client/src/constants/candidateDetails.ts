import { calculateAge } from "@/utils";

export const trumpDetails = {
  image: '/trump.png',
  name: 'Donald Trump',
  party: 'Republican Party',
  description: 'Republican Party Candidate',
  age: calculateAge('1946-06-14'),
  stanceOnCrypto: 'Donald Trump has shifted from a previously critical stance on cryptocurrencies to a supportive one. At the Bitcoin 2024 conference, he announced a set of pro-crypto policies, including creating a U.S. bitcoin reserve, establishing a crypto advisory council, and enacting crypto-friendly regulations. He also criticized the current administration’s regulatory approach and vowed to remove officials like SEC Chair Gary Gensler, who has been tough on crypto enforcement. Trump\'s campaign now actively embraces the crypto industry, signaling a significant change in his approach.',
};

export const kamalaDetails = {
  image: '/kamala.png',
  name: 'Kamala Harris',
  party: 'Democratic Party',
  description: 'Democratic Party Candidate',
  age: calculateAge('1964-10-20'),
  stanceOnCrypto: 'Kamala Harris has not taken a definitive public stance on cryptocurrency. However, recent developments suggest a possible shift in her position. As the U.S. Vice President and Democratic presidential nominee, Harris has shown signs of openness towards engaging with the cryptocurrency community. Her campaign has started reaching out to crypto representatives, indicating a willingness to explore the sector\'s potential and policy implications.',
};

