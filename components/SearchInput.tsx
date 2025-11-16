import { colors } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

interface SearchInputProps extends TextInputProps {
  onSubmit?: () => void;
  readOnly?: boolean;
  onPress?: () => void;
}

function SearchInput({
  onSubmit,
  readOnly,
  onPress,
  ...props
}: SearchInputProps) {
  if (readOnly && onPress) {
    return (
      <Pressable style={styles.container} onPress={onPress}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholderTextColor={colors.GRAY_500}
          editable={false}
          {...props}
        />
        <Ionicons name="search" size={20} color={colors.GRAY_500} />
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholderTextColor={colors.GRAY_500}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        {...props}
      />
      <Ionicons
        name="search"
        size={20}
        onPress={onSubmit}
        color={colors.GRAY_500}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    height: 44,
    paddingHorizontal: 10,
    backgroundColor: colors.GRAY_100,
    borderRadius: 100,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    paddingLeft: 0,
    color: colors.BLACK,
  },
});

export default SearchInput;
