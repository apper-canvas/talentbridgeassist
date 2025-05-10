import * as Icons from 'lucide-react';

const getIcon = (iconName) => {
  return Icons[iconName] || Icons.Smile;
}

export default getIcon;