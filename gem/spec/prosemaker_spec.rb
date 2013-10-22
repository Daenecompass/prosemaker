
require './lib/prosemaker'

describe ProseMaker do
  # --------------------------------------------------
  # --------------------------------------------------
  describe '@data' do

    it 'starts blank' do
      p = ProseMaker.new

      expect(p.data).to eq({})
    end

    it 'can be set' do
      p = ProseMaker.new
      test_data = { a: 1, b:5 }
      p.data = test_data

      expect(p.data).to eq(test_data)
    end

    it 'must be hash-like' do
      p = ProseMaker.new
      test_data = Integer

      expect { p.data = test_data }.to raise_error(ArgumentError)

      p = ProseMaker.new
      class Hashlike
        def []
          # hmm
        end
      end
      test_hashlike = Hashlike.new

      expect { p.data = test_hashlike }.to_not raise_error

    end

  end
  # --------------------------------------------------
  describe '@source' do
    it 'starts blank' do
      p = ProseMaker.new

      expect(p.source).to eq('')
    end

    it 'can be set' do
      p = ProseMaker.new
      test_source = "source document"
      p.source = test_source

      expect(p.source).to eq(test_source)
    end

    it 'must be string-like' do
      p = ProseMaker.new
      test_source = Integer

      expect { p.source = test_source }.to raise_error(ArgumentError)

      p = ProseMaker.new
      class Stringish
        def to_str
          'a string'
        end
      end
      test_stringish = Stringish.new

      expect { p.source = test_stringish }.to_not raise_error

    end

  end
  # --------------------------------------------------
  describe '@doc inclusions' do

    it 'includes data variables' do
      p = ProseMaker.new
      p.data = { a: 1, b: 2, s: 'bam' }
      var_tests = {
        '$$a'                => '1',
        '$$b'                => '2',
        '$$c'                => '$$c',
        '$$s'                => 'bam',
        '$$sbalam'           => 'bambalam',
        'a is $$a, b is $$b' => 'a is 1, b is 2',
        '$$a$$s$$b$$a$$s'    => '1bam21bam'
      }

      var_tests.each do |test, result|
        p.source = test
        expect(p.doc).to eq(result)
      end
    end

    it 'includes longer varnames first' do
      p = ProseMaker.new
      p.data = { s: 'bam', sss: 'foobar' }
      var_tests = {
        '$$s'                => 'bam',
        '$$sss'              => 'foobar',
        '$$s$$sss$$s'        => 'bamfoobarbam'
      }

      var_tests.each do |test, result|
        p.source = test
        expect(p.doc).to eq(result)
      end
    end

    it 'subs varnames inside other varnames' do
      p = ProseMaker.new
      p.data = { a: 'bar', foobar: 'bam' }
      var_tests = {
        '$$foobar'           => 'bam',
        '$$foo$$a'           => 'bam',
      }

      var_tests.each do |test, result|
        p.source = test
        expect(p.doc).to eq(result)
      end
    end

  end
  # --------------------------------------------------
  describe '@doc absolute conditionals' do

    it 'includes [[always]] parts' do
      p = ProseMaker.new
      p.source = '[[always]]asdf'
      expect(p.doc).to eq('asdf')

      p.source = 'qwer[[always]]asdf'
      expect(p.doc).to eq('qwerasdf')

      p.source = 'qwer[[always]]asdf[[always]]zxcv'
      expect(p.doc).to eq('qwerasdfzxcv')
    end

    it 'omits [[never]] parts' do
      p = ProseMaker.new
      p.source = '[[never]]asdf'
      expect(p.doc).to eq('')

      p.source = 'qwer[[never]]asdf'
      expect(p.doc).to eq('qwer')

      p.source = 'qwer[[never]]asdf[[always]]zxcv'
      expect(p.doc).to eq('qwerzxcv')
    end

  end
  # --------------------------------------------------
  describe '@doc variable conditionals' do

    it 'compares integers' do
      p = ProseMaker.new
      p.data = { a: 1, b: 2, c:10, z:0 }
      {
        '[[ a < 2 ]]pass'     => 'pass',
        'pass[[ a > 2 ]]fail' => 'pass',
      }.each do |test, result|
        p.source = test
        expect(p.doc).to eq(result)
      end
    end

  end
  # --------------------------------------------------
  # --------------------------------------------------
end