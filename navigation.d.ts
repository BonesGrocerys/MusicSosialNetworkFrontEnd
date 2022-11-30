import { TypeRootStackParamList } from "./navigation/types";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends TypeRootStackParamList {}
  }
}
